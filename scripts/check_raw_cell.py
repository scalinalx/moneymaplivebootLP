import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheet = data.get('Sheets', {}).get("Beauty  Skincare Experts", {})
cell = sheet.get('!data', [])[1][4]
print(f"RAW CELL DATA: {json.dumps(cell)}")
