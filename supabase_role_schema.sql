-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'Founder';

-- Add check constraint for valid roles
ALTER TABLE profiles ADD CONSTRAINT IF NOT EXISTS valid_role CHECK (role IN ('Founder', 'Mentor', 'Investor'));

-- Create index for role-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Create mentorship_requests table for Mentor-Founder relationships
CREATE TABLE IF NOT EXISTS mentorship_requests (
    id SERIAL PRIMARY KEY,
    founder_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment_interests table for Investor-Founder relationships
CREATE TABLE IF NOT EXISTS investment_interests (
    id SERIAL PRIMARY KEY,
    founder_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    investor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interest_level VARCHAR(20) DEFAULT 'interested' CHECK (interest_level IN ('interested', 'not_interested')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_interests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentorship_requests
CREATE POLICY "Users can view their own mentorship requests" ON mentorship_requests
    FOR SELECT USING (auth.uid() = founder_id OR auth.uid() = mentor_id);

CREATE POLICY "Founders can create mentorship requests" ON mentorship_requests
    FOR INSERT WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Mentors can update mentorship requests" ON mentorship_requests
    FOR UPDATE USING (auth.uid() = mentor_id);

-- RLS Policies for investment_interests
CREATE POLICY "Users can view their own investment interests" ON investment_interests
    FOR SELECT USING (auth.uid() = founder_id OR auth.uid() = investor_id);

CREATE POLICY "Investors can create investment interests" ON investment_interests
    FOR INSERT WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Investors can update their investment interests" ON investment_interests
    FOR UPDATE USING (auth.uid() = investor_id);
