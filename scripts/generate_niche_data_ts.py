import json
import os

def create_final_niche_data():
    full_data_path = 'src/data/vdpb/nicheData_full.json'
    output_path = 'src/data/vdpb/nicheData.ts'
    
    if not os.path.exists(full_data_path):
        print(f"Error: {full_data_path} not found.")
        return

    with open(full_data_path, 'r') as f:
        full_data = json.load(f)

    # Icon map (approximate)
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

    niche_list = []
    for niche_name, products in full_data.items():
        clean_products = []
        for p in products:
            # Skip if missing core data
            if not p.get('general_idea') or not p.get('problem_solved'):
                continue
            
            # Use data from JSON if available, else stick to extracted validation lists
            clean_products.append({
                "general_idea": p['general_idea'],
                "problems_solved": [p['problem_solved']], # In Excel it was 1 problem per row
                "name_options": p.get('name_options', []),
                "format_options": p.get('format_options', ["E-book", "Video Training", "Checklist/Template", "Digital Workbook", "Audio Guide"]),
                "resources": p.get('resources', [])
            })
            
        niche_list.append({
            "id": niche_name.lower().replace(" ", "-").replace("&", "n").replace("+", "plus"),
            "name": niche_name,
            "icon": icon_map.get(niche_name, "Package"),
            "products": clean_products
        })

    # Sort niches by name
    niche_list.sort(key=lambda x: x["name"])

    niche_names = [n["name"] for n in niche_list]
    niche_data_record = {n["name"]: n["products"] for n in niche_list}

    ts_content = f"""import {{ Product }} from './types';

export const NICHE_NAMES: string[] = {json.dumps(niche_names, indent=2)};

export const NICHE_DATA: Record<string, Product[]> = {json.dumps(niche_data_record, indent=2)};
"""
    
    with open(output_path, 'w') as f:
        f.write(ts_content)
    print(f"Generated {output_path} with {len(niche_list)} niches.")

if __name__ == "__main__":
    create_final_niche_data()
