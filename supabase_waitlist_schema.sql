-- Create waitlist table for marketing site
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Founder', 'Mentor', 'Investor')),
    city VARCHAR(100) NOT NULL,
    bio TEXT,
    referral VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index for role filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist(role);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous inserts for waitlist signups
CREATE POLICY "Allow anonymous waitlist inserts" ON waitlist
    FOR INSERT 
    WITH CHECK (true);

-- RLS Policy: Allow authenticated users to view waitlist (for admin purposes)
CREATE POLICY "Allow authenticated users to view waitlist" ON waitlist
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- RLS Policy: Only allow updates by authenticated users
CREATE POLICY "Allow authenticated users to update waitlist" ON waitlist
    FOR UPDATE 
    USING (auth.role() = 'authenticated');

-- RLS Policy: Only allow deletes by authenticated users
CREATE POLICY "Allow authenticated users to delete waitlist" ON waitlist
    FOR DELETE 
    USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER waitlist_updated_at_trigger
    BEFORE UPDATE ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_waitlist_updated_at();
