import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheet = data.get('Sheets', {}).get("Busy Parents", {})
row1 = sheet.get('!data', [])[1]

print("--- BUSY PARENTS ROW 1 ---")
for i, cell in enumerate(row1):
    val = cell.get('v') if cell and 'v' in cell else "n/a"
    print(f"Col {i}: {val}")

# Also check row 6 (second idea)
row6 = sheet.get('!data', [])[6]
print("\n--- BUSY PARENTS ROW 6 ---")
for i, cell in enumerate(row6):
    val = cell.get('v') if cell and 'v' in cell else "n/a"
    print(f"Col {i}: {val}")
