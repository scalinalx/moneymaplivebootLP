const { createClient } = require('@supabase/supabase-js');
const dot = require('dotenv');
dot.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function check() {
  const url = supabaseUrl + '/rest/v1/';
  const res = await fetch(url, {
    headers: { 'apikey': supabaseKey, 'Authorization': 'Bearer ' + supabaseKey }
  });
  const data = await res.json();
  const defs = data.definitions || {};
  
  const targetTables = ['ana_ai_leads', 'genius_ideas_leads', 'hit10k_leads', 'launch_lab_leads', 'leads_bootcamp_brands'];
  
  targetTables.forEach(t => {
    if (defs[t]) {
      console.log(\`Table: \${t}\`);
      console.log('Columns:', Object.keys(defs[t].properties).join(', '));
    } else {
      console.log(\`Table: \${t} NOT FOUND in OpenAPI spec\`);
    }
  });
}

check();
