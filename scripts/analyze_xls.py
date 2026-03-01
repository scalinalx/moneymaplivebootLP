import json
import os

def analyze_full_json(json_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    sheets = data.get('Sheets', {})
    workbook_sheets = data.get('Workbook', {}).get('Sheets', [])
    sheet_names = [s['name'] for s in workbook_sheets]
    
    summary = {}
    
    for name in sheet_names:
        if name in ["START HERE!", "Table Of Contents"]:
            continue
        
        sheet = sheets.get(name, {})
        sheet_data = sheet.get('!data', [])
        if not sheet_data:
            continue
            
        extracted_rows = []
        for row in sheet_data:
            if row is None:
                continue
            
            # Helper to get value from cell object
            def get_val(idx):
                if idx < len(row) and row[idx] and isinstance(row[idx], dict) and 'v' in row[idx]:
                    return str(row[idx]['v']).strip()
                return ""

            # Check if this row has "General Product Idea" or similar
            # In the first niche sheet, col 1 is the idea.
            idea = get_val(1)
            problem = get_val(3)
            name_opt = get_val(4)
            fmt = get_val(5)
            res = get_val(6)
            
            if idea and idea != "General Product Idea":
                extracted_rows.append({
                    "niche": name,
                    "general_idea": idea,
                    "problem_solved": problem,
                    "name_options": name_opt,
                    "format_options": fmt,
                    "resources": res
                })
        
        if extracted_rows:
            summary[name] = extracted_rows
            
    return summary

if __name__ == "__main__":
    infile = "docs/viral_product_builder_full.json"
    outfile = "docs/viral_product_builder_summary.json"
    
    if os.path.exists(infile):
        result = analyze_full_json(infile)
        with open(outfile, 'w') as f:
            json.dump(result, f, indent=2)
        print(f"Summary written to {outfile}")
        print(f"Total niches processed: {len(result)}")
    else:
        print(f"Input file {infile} not found.")
