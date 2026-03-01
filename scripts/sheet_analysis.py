import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Sheets', {})
workbook = data.get('Workbook', {})
sheets_list = workbook.get('Sheets', [])

print("--- SHEET ANALYSIS ---")
total_rows = 0
for s in sheets_list:
    name = s['name']
    if name in ["START HERE!", "Table Of Contents"]:
        continue
    
    sheet_data = sheets.get(name, {}).get("!data", [])
    row_count = len(sheet_data)
    total_rows += row_count
    
    # Check for name options (Col 4)
    names_found = 0
    for row in sheet_data:
        if row and len(row) > 4:
            cell = row[4]
            if cell and isinstance(cell, dict) and 'v' in cell:
                v = cell.get('v')
                if v and str(v).strip() != "" and "Potential Name" not in str(v):
                    names_found += 1
    
    print(f"Sheet: {name}, Rows: {row_count}, Names in Col 4: {names_found}")

print(f"\nTotal Rows in all niche sheets: {total_rows}")
