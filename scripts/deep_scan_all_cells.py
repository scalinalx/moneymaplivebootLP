import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Sheets', {})
busy_parents = sheets.get("Busy Parents", {}).get("!data", [])

if busy_parents:
    print("--- BUSY PARENTS: ALL NON-NULL CELLS (Rows 1-20) ---")
    for r_idx in range(21):
        if r_idx < len(busy_parents) and busy_parents[r_idx]:
            row = busy_parents[r_idx]
            row_vals = []
            for c_idx, cell in enumerate(row):
                if cell and 'v' in cell and cell['v'] is not None and str(cell['v']).strip() != "":
                    row_vals.append(f"C{c_idx}: {cell['v']}")
            if row_vals:
                print(f"Row {r_idx}: {' | '.join(row_vals)}")
        elif r_idx < len(busy_parents):
             print(f"Row {r_idx}: [EMPTY ROW]")

# Also check "Table Of Contents"
toc = sheets.get("Table Of Contents", {}).get("!data", [])
if toc:
    print("\n--- TABLE OF CONTENTS (Rows 0-50) ---")
    for r_idx, row in enumerate(toc[:50]):
        if row:
            vals = [str(c.get('v')) if c and 'v' in c else "n/a" for c in row]
            print(f"Row {r_idx}: {' | '.join(vals)}")
