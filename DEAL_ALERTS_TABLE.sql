-- =====================================================
-- ORLANDO VACATION DEALS - DEAL ALERTS TABLE
-- Created: December 4, 2025
-- Purpose: Store user deal alert subscriptions
-- =====================================================

-- Drop existing table if needed
DROP TABLE IF EXISTS ovd_deal_alerts;

-- Create deal alerts table
CREATE TABLE ovd_deal_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    resort VARCHAR(100) DEFAULT 'any',
    target_price INTEGER,
    travel_dates VARCHAR(100),
    source VARCHAR(50) DEFAULT 'deal-tracker',
    is_active BOOLEAN DEFAULT true,
    last_alerted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate alerts for same email/resort combo
    UNIQUE(email, resort)
);

-- Create indexes for common queries
CREATE INDEX idx_deal_alerts_email ON ovd_deal_alerts(email);
CREATE INDEX idx_deal_alerts_resort ON ovd_deal_alerts(resort);
CREATE INDEX idx_deal_alerts_active ON ovd_deal_alerts(is_active);

-- Enable Row Level Security
ALTER TABLE ovd_deal_alerts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for signup)
CREATE POLICY "Allow anonymous insert" ON ovd_deal_alerts
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access" ON ovd_deal_alerts
    FOR ALL TO service_role
    USING (true);

-- Update existing email subscribers table if it exists
-- (Keep both for different purposes)

-- Add comment explaining the table
COMMENT ON TABLE ovd_deal_alerts IS 'Stores user subscriptions for Disney/Orlando hotel deal alerts';
COMMENT ON COLUMN ovd_deal_alerts.resort IS 'Target resort: any, pop-century, art-of-animation, caribbean-beach, coronado-springs, port-orleans-riverside, port-orleans-french-quarter, etc.';
COMMENT ON COLUMN ovd_deal_alerts.target_price IS 'Maximum price per night user wants to pay (optional)';
COMMENT ON COLUMN ovd_deal_alerts.travel_dates IS 'Preferred travel timeframe like "December 2025" or "Any"';
