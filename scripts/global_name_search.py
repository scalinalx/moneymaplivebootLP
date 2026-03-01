import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

workbook = data.get('Workbook', {})
sheets_list = workbook.get('Sheets', [])
print("--- ALL SHEETS ---")
for s in sheets_list:
    print(f"Name: {s['name']}, Hidden: {s.get('Hidden', 'No')}")

# Try to find a niche that MIGHT have data
# Some niches might be more complete
for name in [s['name'] for s in sheets_list]:
    if name in ["START HERE!", "Table Of Contents"]:
        continue
    
    sheet_data = data.get('Sheets', {}).get(name, {}).get('!data', [])
    if not sheet_data:
        continue
        
    for r_idx, row in enumerate(sheet_data[:20]):
        if row and len(row) > 4:
            val = row[4].get('v') if row[4] and 'v' in row[4] else None
            if val and "Potential Name" not in str(val):
                print(f"FOUND NAME OPTION in {name} Row {r_idx}: {val}")
                break
    else:
        continue
    break
else:
    print("Checked all sheets for Col 4, found nothing.")
