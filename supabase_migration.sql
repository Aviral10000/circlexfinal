-- Add password fields to profiles table
-- Run this in your Supabase SQL Editor

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS password_set BOOLEAN DEFAULT FALSE;

-- Update existing approved profiles to have password_set = false
UPDATE profiles 
SET password_set = FALSE 
WHERE password_set IS NULL;


