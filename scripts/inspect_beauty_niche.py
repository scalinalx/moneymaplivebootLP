import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Sheets', {})
sheet_name = "Beauty  Skincare Experts"
sheet_data = sheets.get(sheet_name, {}).get("!data", [])

if sheet_data:
    print(f"--- {sheet_name} ---")
    for r_idx in range(1, 10):
        if r_idx < len(sheet_data) and sheet_data[r_idx]:
            row = sheet_data[r_idx]
            idea = row[1].get('v') if len(row) > 1 and row[1] else "n/a"
            problem = row[3].get('v') if len(row) > 3 and row[3] else "n/a"
            names = row[4].get('v') if len(row) > 4 and row[4] else "n/a"
            print(f"Row {r_idx} | Idea: {idea} | Problem: {problem} | Names: {names}")
