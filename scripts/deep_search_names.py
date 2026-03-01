import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Sheets', {})

# Let's check "START HERE!" first
start_here = sheets.get("START HERE!", {}).get("!data", [])
print("--- START HERE! ---")
for r_idx, row in enumerate(start_here[:20]):
    if row:
        vals = [str(c.get('v')) if c and 'v' in c else "n/a" for c in row]
        print(f"Row {r_idx}: {' | '.join(vals)}")

# Let's check a niche sheet deeper for "Name Options" (Col 4)
niche_name = "Busy Parents"
busy_parents = sheets.get(niche_name, {}).get("!data", [])
print(f"\n--- {niche_name} Deeper Scan ---")
found_names = 0
for r_idx, row in enumerate(busy_parents):
    if row and len(row) > 4:
        name_opt = row[4].get('v') if row[4] and 'v' in row[4] else None
        if name_opt and name_opt != "Potential Name Options               (Choose 1)":
            print(f"Row {r_idx} Col 4: {name_opt}")
            found_names += 1
    if found_names > 10:
        break

if found_names == 0:
    print("No name options found in 'Busy Parents' using Col 4.")
