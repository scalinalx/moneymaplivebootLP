import os
import re
import json
import xml.etree.ElementTree as ET

def get_sheet_mapping(base_dir):
    # Parse workbook.xml to get names and sheet IDs
    workbook_path = os.path.join(base_dir, 'xl', 'workbook.xml')
    tree = ET.parse(workbook_path)
    root = tree.getroot()
    
    ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
          'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
    
    sheets = []
    for sheet in root.findall('.//main:sheet', ns):
        name = sheet.get('name')
        sheet_id = sheet.get('sheetId')
        # We assume sheetId mapping to sheet{sheetId}.xml for simplicity, 
        # but technically we should check workbook.xml.rels
        sheets.append({'name': name, 'id': sheet_id})
    return sheets

def parse_sqref(sqref):
    # sqref can be "E3" or "E22:E23" or "G2:G5 G7:G10 ..."
    ranges = sqref.split(' ')
    affected_cells = []
    for r in ranges:
        if ':' in r:
            start, end = r.split(':')
            start_col = re.match(r'([A-Z]+)', start).group(1)
            start_row = int(re.match(r'[A-Z]+(\d+)', start).group(1))
            end_col = re.match(r'([A-Z]+)', end).group(1)
            end_row = int(re.match(r'[A-Z]+(\d+)', end).group(1))
            
            for row in range(start_row, end_row + 1):
                # We only care about rows for now as we know the columns
                affected_cells.append((start_col, row))
        else:
            col = re.match(r'([A-Z]+)', r).group(1)
            row = int(re.match(r'[A-Z]+(\d+)', r).group(1))
            affected_cells.append((col, row))
    return affected_cells

def extract_sheet_data(sheet_file):
    if not os.path.exists(sheet_file):
        return {}
    
    tree = ET.parse(sheet_file)
    root = tree.getroot()
    ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    
    # 1. Extract Shared String references
    # (For simplicity here, we'll just look for inline strings or assume we need sharedStrings.xml)
    # Actually, let's just use the existing summary JSON for Idea and Problem since it's already parsed well.
    # This script will FOCUS on the dataValidation lists.
    
    validations = {}
    for dv in root.findall('.//main:dataValidation', ns):
        formula = dv.find('main:formula1', ns)
        if formula is not None and formula.text:
            options = formula.text.strip('"').split(',')
            sqref = dv.get('sqref')
            cells = parse_sqref(sqref)
            for col, row in cells:
                if row not in validations:
                    validations[row] = {}
                validations[row][col] = options
                
    return validations

def main():
    base_dir = 'xls_unzipped'
    output_file = 'src/data/vdpb/nicheData_full.json'
    
    # Load existing summary to get Idea and Problem
    summary_path = 'docs/viral_product_builder_summary.json'
    with open(summary_path, 'r') as f:
        summary_data = json.load(f)
    
    sheet_mapping = get_sheet_mapping(base_dir)
    niche_to_sheet = {s['name']: f"sheet{s['id']}.xml" for s in sheet_mapping}
    
    final_data = {}
    
    for niche_name, products in summary_data.items():
        sheet_file = os.path.join(base_dir, 'xl', 'worksheets', niche_to_sheet.get(niche_name, ''))
        validations = extract_sheet_data(sheet_file)
        
        final_products = []
        # The summary JSON rows match the Excel rows roughly.
        # Niche data starts at row 2 in Excel (index 1 in 1-based, often)
        # We need to find the match.
        
        # Let's just iterate and try to match by row index.
        # This is a bit risky but standard for fixed-format sheets.
        
        # Re-parse the sheet to find which row each idea is in
        tree = ET.parse(sheet_file)
        root = tree.getroot()
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        
        # shared strings helper
        with open(os.path.join(base_dir, 'xl', 'sharedStrings.xml'), 'r') as f:
            ss_content = f.read()
            # This is a bit hacky but fast
            shared_strings = re.findall(r'<t>(.*?)</t>', ss_content)

        row_data = {}
        for row_node in root.findall('.//main:row', ns):
            row_idx = int(row_node.get('r'))
            row_data[row_idx] = {}
            for cell in row_node.findall('main:c', ns):
                col_letter = re.match(r'([A-Z]+)', cell.get('r')).group(1)
                v_node = cell.find('main:v', ns)
                if v_node is not None:
                    val = v_node.text
                    if cell.get('t') == 's':
                        val = shared_strings[int(val)] if int(val) < len(shared_strings) else val
                    row_data[row_idx][col_letter] = val
        
        for p in products:
            idea = p['general_idea']
            if not idea:
                continue
                
            # Ensure they are lists
            p['name_options'] = []
            p['format_options'] = []
            p['resources'] = []
            
            # Find the row in row_data where Col B == idea
            matched_row = None
            for r_idx, cols in row_data.items():
                if cols.get('B') == idea:
                    matched_row = r_idx
                    break
            
            if matched_row and matched_row in validations:
                p['name_options'] = validations[matched_row].get('E', [])
                p['format_options'] = validations[matched_row].get('F', [])
                p['resources'] = validations[matched_row].get('G', [])
            
            # Clean up Case Study rows - they aren't products
            if "CASE STUDY" not in idea:
                final_products.append(p)
                
        final_data[niche_name] = final_products

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(final_data, f, indent=2)
    print(f"Extracted data for {len(final_data)} niches.")

if __name__ == "__main__":
    main()
