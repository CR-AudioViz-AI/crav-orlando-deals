-- Orlando Vacation Deals - Database Tables
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/kteobfyferrukqeolofj/sql

-- Email Subscribers
CREATE TABLE IF NOT EXISTS ovd_email_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS ovd_contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Inquiries
CREATE TABLE IF NOT EXISTS ovd_investor_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    interest_type TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Travel Agent Signups
CREATE TABLE IF NOT EXISTS ovd_agent_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    agency_name TEXT NOT NULL,
    phone TEXT,
    iata_clia TEXT,
    website TEXT,
    monthly_volume TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional - for public access)
ALTER TABLE ovd_email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ovd_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ovd_investor_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ovd_agent_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for insert (allow anyone to insert)
CREATE POLICY "Allow public insert" ON ovd_email_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON ovd_contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON ovd_investor_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON ovd_agent_signups FOR INSERT WITH CHECK (true);

-- Success!
SELECT 'Tables created successfully!' as status;
