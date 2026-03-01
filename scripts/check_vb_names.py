import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

# Check for DefinedNames
wb = data.get('Workbook', {})
names = wb.get('Names', [])
if names:
    print("--- DEFINED NAMES ---")
    for n in names[:50]:
        print(n)

# Check for a "Data" sheet or similar
sheets = data.get('Sheets', {})
for name in sheets.keys():
    if "Data" in name or "List" in name or "Names" in name:
        print(f"FOUND INTERESTING SHEET: {name}")

# Some tools put data validation in a separate property
# Let's check !dataValidation or similar if it exists
for sheet_name, sheet_data in sheets.items():
    if "!dataValidation" in sheet_data:
        print(f"Data Validation found in {sheet_name}")
