// Orlando Vacation Deals - Deal Alert Signup API
// Uses notifications table as workaround for deal alert storage
// Automated fix by Claude - December 5, 2025

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, resort, targetPrice, travelDates, source } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Supabase credentials
    const SUPABASE_URL = 'https://kteobfyferrukqeolofj.supabase.co';
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZW9iZnlmZXJydWtxZW9sb2ZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE5NzI2NiwiZXhwIjoyMDc3NTU3MjY2fQ.5baSBOBpBzcm5LeV4tN2H0qQJGNJoH0Q06ROwhbijCI';

    // Store in notifications table as workaround
    // Format: type=deal_alert, title=Deal Alert Signup, message=JSON data
    const alertData = {
      email,
      resort: resort || 'any',
      target_price: targetPrice ? parseInt(targetPrice) : null,
      travel_dates: travelDates || null,
      source: source || 'deal-tracker',
      signed_up_at: new Date().toISOString()
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        type: 'deal_alert_signup',
        title: `Deal Alert: ${email}`,
        message: JSON.stringify(alertData)
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Supabase error:', result);
      return res.status(500).json({ 
        error: 'Failed to save alert',
        details: result.message 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Deal alert created successfully',
      id: result[0]?.id
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
