import json

with open("docs/viral_product_builder_full.json", 'r') as f:
    data = json.load(f)

sheets = data.get('Sheets', {})
busy_parents = sheets.get("Busy Parents", {}).get("!data", [])

if busy_parents:
    print("Row 0 (Headers):")
    row0 = busy_parents[0]
    for i, cell in enumerate(row0):
        val = cell.get('v') if cell and 'v' in cell else "null"
        print(f"Col {i}: {val}")
    
    target_niches = ["Busy Parents", "E-commerce Store Owners", "Digital Marketing Pros", "Health & Fitness Enthusiasts"]
    for niche_name in target_niches:
        print(f"\n--- NICHE: {niche_name} ---")
        niche_data = sheets.get(niche_name, {}).get("!data", [])
        if niche_data:
            for r_idx in range(1, 10):
                if r_idx < len(niche_data):
                    row = niche_data[r_idx]
                    if row:
                        vals = []
                        for i, cell in enumerate(row):
                            val = cell.get('v') if cell and 'v' in cell else "n/a"
                            if val != "n/a":
                                vals.append(f"{i}:{val}")
                        if vals:
                            print(f"Row {r_idx}: " + " | ".join(vals))
