-- Create pitches table for investor pitches
CREATE TABLE IF NOT EXISTS pitches (
  id SERIAL PRIMARY KEY,
  founder_email TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('investor', 'mentor', 'cofounder')),
  target_id INTEGER NOT NULL,
  target_name TEXT NOT NULL,
  message TEXT NOT NULL,
  pitch_deck_link TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table for mentorship and cofounder applications
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  founder_email TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('mentor', 'cofounder')),
  target_id INTEGER NOT NULL,
  target_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create connections table for mutual matches
CREATE TABLE IF NOT EXISTS connections (
  id SERIAL PRIMARY KEY,
  founder1_email TEXT NOT NULL,
  founder2_email TEXT NOT NULL,
  connection_type TEXT NOT NULL DEFAULT 'founder' CHECK (connection_type IN ('founder', 'cofounder', 'mentor', 'investor')),
  status TEXT NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(founder1_email, founder2_email)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  founder_email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('match', 'message', 'connection', 'pitch', 'application')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for pitches
CREATE POLICY "Founders can view their own pitches" ON pitches
  FOR SELECT USING (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "Founders can insert their own pitches" ON pitches
  FOR INSERT WITH CHECK (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "Admins can view all pitches" ON pitches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.email = auth.jwt() ->> 'email' 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update pitch status" ON pitches
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.email = auth.jwt() ->> 'email' 
      AND profiles.is_admin = true
    )
  );

-- Create policies for applications
CREATE POLICY "Founders can view their own applications" ON applications
  FOR SELECT USING (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "Founders can insert their own applications" ON applications
  FOR INSERT WITH CHECK (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "Admins can view all applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.email = auth.jwt() ->> 'email' 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update application status" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.email = auth.jwt() ->> 'email' 
      AND profiles.is_admin = true
    )
  );

-- Create policies for connections
CREATE POLICY "Founders can view their connections" ON connections
  FOR SELECT USING (
    founder1_email = auth.jwt() ->> 'email' OR 
    founder2_email = auth.jwt() ->> 'email'
  );

CREATE POLICY "Founders can create connections" ON connections
  FOR INSERT WITH CHECK (
    founder1_email = auth.jwt() ->> 'email' OR 
    founder2_email = auth.jwt() ->> 'email'
  );

-- Create policies for notifications
CREATE POLICY "Founders can view their notifications" ON notifications
  FOR SELECT USING (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "Founders can update their notifications" ON notifications
  FOR UPDATE USING (founder_email = auth.jwt() ->> 'email');

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pitches_founder_email ON pitches(founder_email);
CREATE INDEX IF NOT EXISTS idx_pitches_status ON pitches(status);
CREATE INDEX IF NOT EXISTS idx_applications_founder_email ON applications(founder_email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_connections_founder1 ON connections(founder1_email);
CREATE INDEX IF NOT EXISTS idx_connections_founder2 ON connections(founder2_email);
CREATE INDEX IF NOT EXISTS idx_notifications_founder_email ON notifications(founder_email);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_pitches_updated_at BEFORE UPDATE ON pitches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
