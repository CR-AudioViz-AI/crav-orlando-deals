import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kteobfyferrukqeolofj.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZW9iZnlmZXJydWtxZW9sb2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTcyNjYsImV4cCI6MjA3NzU1NzI2Nn0.uy-jlF_z6qVb8qogsNyGDLHqT4HhmdRhLrW7zPv3qhY';

const supabase = createClient(supabaseUrl, supabaseKey);

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

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Insert into deal_alerts table
    const { data, error } = await supabase
      .from('ovd_deal_alerts')
      .insert([{
        email: email.toLowerCase().trim(),
        resort: resort || 'any',
        target_price: targetPrice ? parseInt(targetPrice) : null,
        travel_dates: travelDates || null,
        source: source || 'deal-tracker',
        is_active: true,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      // Handle duplicate email for same resort
      if (error.code === '23505') {
        return res.status(200).json({ 
          success: true, 
          message: 'You are already signed up for alerts!',
          alreadyExists: true
        });
      }
      throw error;
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Deal alert created! We will email you when prices drop.',
      alertId: data?.[0]?.id
    });

  } catch (error) {
    console.error('Deal alert error:', error);
    return res.status(500).json({ 
      error: 'Failed to create alert. Please try again.',
      details: error.message 
    });
  }
}
