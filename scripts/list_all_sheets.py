import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Workbook', {}).get('Sheets', [])
for s in sheets:
    print(s['name'])
