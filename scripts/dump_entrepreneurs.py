import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheet = data.get('Sheets', {}).get("Aspiring Entrepreneurs", {})
print("--- Aspiring Entrepreneurs ALL DATA ---")
for r_idx, row in enumerate(sheet.get('!data', [])):
    if row:
        vals = [f"C{i}:{cell.get('v')}" for i, cell in enumerate(row) if cell and cell.get('v')]
        if vals:
            print(f"Row {r_idx}: {' | '.join(vals)}")
