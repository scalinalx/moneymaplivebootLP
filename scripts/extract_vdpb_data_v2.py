import json
import os

def extract_vdpb_data_v2(json_path, output_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    sheets = data.get('Sheets', {})
    workbook_sheets = data.get('Workbook', {}).get('Sheets', [])
    sheet_names = [s['name'] for s in workbook_sheets]
    
    niche_data = []

    # Map for icons based on niche name (approximate)
    icon_map = {
        "Busy Parents": "Users",
        "Aspiring Entrepreneurs": "Lightbulb",
        "Solopreneurs  Freelancers": "Briefcase",
        "Coaches & Consultants": "UserCheck",
        "Personal Development   Self-Imp": "TrendingUp",
        "Health & Fitness Enthusiasts": "Activity",
        "Mindfulness & Spiritual Growth": "Sun",
        "Stress & Anxiety Management": "Wind",
        "Body Positivity &  Self-Love Ad": "Heart",
        "Relationship & Dating Advice": "MessageCircle",
        "Navigating  Divorce  Breakups": "Shield",
        "Career Changers": "Zap",
        "Midlife Transitions": "RefreshCw",
        "People Seeking Side Hustles": "DollarSign",
        "Financial Coaching  & Budgeting": "PieChart",
        "Investing & Wealth Building": "BarChart2",
        "Bloggers & Content Creators": "Edit3",
        "Aspiring Influencers": "Star",
        "Podcasters & Broadcasters": "Mic",
        "Online Course Creators  Members": "BookOpen",
        "E-commerce Store Owners": "ShoppingCart",
        "Handmade  Craft  Business Owner": "Hammer",
        "Digital Marketing Pros": "Target",
        "Virtual Assistants & Online  Se": "Headphones",
        "Authors  Writers": "Book",
        "Event & Wedding Planners": "Calendar",
        "Photographers & Videographers": "Camera",
        "Interior Designers & Home Organ": "Home",
        "Non-Profit & Philanthropy Profe": "Globe",
        "Tech Founders & Innovators  (Sa": "Cpu",
        "Travel Bloggers   Travel Coache": "Map",
        "Sustainable Living   Eco-Friend": "Leaf",
        "Beauty  Skincare Experts": "Sparkles",
        "Holistic  Alternative  Health P": "PlusCircle",
        "Personal Stylists  Image Consul": "Shirt",
        "Individuals with Chronic Illnes": "AlertCircle",
        "Pet Care & Animal Lovers": "Smile",
        "Foodies & Culinary Enthusiasts": "Coffee",
        "Gamers & Esports Enthusiasts": "Gamepad2",
        "Spiritual Entrepreneurs": "Moon",
        "Students & Recent Grads": "GraduationCap",
        "Networking & Mastermind Communi": "Users",
        "Confidence & Assertiveness Trai": "Award",
        "Language Learners & Polyglots": "Languages",
        "Relationship-Building & Conflic": "Handshake",
        "Local  Community- Based Busines": "MapPin",
        "LGBTQ+ Support & Advocacy": "Rainbow",
        "Remote Workers & Digital Nomads": "Wifi",
        "Home Owners   DIY Improvement": "Tool",
        "Hobbyists & Lifelong Learners": "Music"
    }

    for name in sheet_names:
        if name in ["START HERE!", "Table Of Contents"]:
            continue
        
        sheet = sheets.get(name, {})
        sheet_data = sheet.get('!data', [])
        if not sheet_data:
            continue
            
        products = []
        current_product = None
        
        for r_idx, row in enumerate(sheet_data):
            if not row: continue
            
            def get_val(idx):
                if idx < len(row) and row[idx] and isinstance(row[idx], dict) and 'v' in row[idx]:
                    return str(row[idx]['v']).strip()
                return ""

            idea = get_val(1)
            problem = get_val(3)
            name_opt = get_val(4)
            format_opt = get_val(5)
            resource = get_val(6)
            
            # Header or empty
            if idea == "General Product Idea": continue
            
            # New product idea start (idea is present)
            if idea:
                if current_product:
                    products.append(current_product)
                current_product = {
                    "general_idea": idea,
                    "problems_solved": [],
                    "name_options": [],
                    "format_options": ["E-book", "Video Training", "Checklist/Template", "Digital Workbook", "Audio Guide"], # Fallback
                    "resources": []
                }
                if problem: current_product["problems_solved"].append(problem)
                if name_opt: current_product["name_options"].append(name_opt)
                if format_opt: current_product["format_options"] = [format_opt]
                if resource: current_product["resources"].append(resource)
            
            # Supplemental info for the CURRENT product (idea is empty but other fields are present)
            elif current_product and (problem or name_opt or format_opt or resource):
                if problem and problem not in current_product["problems_solved"]:
                    current_product["problems_solved"].append(problem)
                if name_opt and name_opt not in current_product["name_options"]:
                    current_product["name_options"].append(name_opt)
                if format_opt:
                    if "E-book" in current_product["format_options"] and len(current_product["format_options"]) == 5:
                        current_product["format_options"] = []
                    if format_opt not in current_product["format_options"]:
                        current_product["format_options"].append(format_opt)
                if resource and resource not in current_product["resources"]:
                    current_product["resources"].append(resource)
        
        if current_product:
            products.append(current_product)
            
        if products:
            niche_data.append({
                "id": name.lower().replace(" ", "-").replace("&", "n"),
                "name": name,
                "icon": icon_map.get(name, "Package"),
                "products": products
            })
            
    with open(output_path, 'w') as f:
        json.dump(niche_data, f, indent=2)

if __name__ == "__main__":
    extract_vdpb_data_v2("docs/viral_product_builder_full.json", "src/data/vdpb/nicheData_extracted.json")
