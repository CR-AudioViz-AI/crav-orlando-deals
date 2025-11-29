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
    const { type, data } = req.body;

    switch (type) {
      case 'email':
        const { error: emailError } = await supabase
          .from('ovd_email_subscribers')
          .insert([{ 
            email: data.email, 
            source: data.source || 'unknown',
            created_at: new Date().toISOString()
          }]);
        
        if (emailError && emailError.code !== '23505') { // Ignore duplicate
          throw emailError;
        }
        return res.status(200).json({ success: true, message: 'Subscribed!' });

      case 'contact':
        const { error: contactError } = await supabase
          .from('ovd_contact_submissions')
          .insert([{
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            subject: data.subject,
            message: data.message,
            created_at: new Date().toISOString()
          }]);
        
        if (contactError) throw contactError;
        return res.status(200).json({ success: true, message: 'Message sent!' });

      case 'investor':
        const { error: investorError } = await supabase
          .from('ovd_investor_inquiries')
          .insert([{
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            company: data.company,
            interest_type: data.interestType,
            message: data.message,
            created_at: new Date().toISOString()
          }]);
        
        if (investorError) throw investorError;
        return res.status(200).json({ success: true, message: 'Inquiry received!' });

      case 'agent':
        const { error: agentError } = await supabase
          .from('ovd_agent_signups')
          .insert([{
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            agency_name: data.agencyName,
            phone: data.phone,
            iata_clia: data.iataClia,
            website: data.website,
            monthly_volume: data.monthlyVolume,
            description: data.description,
            created_at: new Date().toISOString()
          }]);
        
        if (agentError) throw agentError;
        return res.status(200).json({ success: true, message: 'Application submitted!' });

      default:
        return res.status(400).json({ error: 'Invalid submission type' });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: error.message || 'Submission failed' });
  }
}
