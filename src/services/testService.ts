import { supabase } from '../supabase';

export const testService = {
  // Test Supabase connection
  async testConnection(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection test failed:', error);
        return false;
      }
      
      console.log('✅ Supabase connection successful');
      return true;
    } catch (err) {
      console.error('Supabase connection test error:', err);
      return false;
    }
  },

  // Create a test profile
  async createTestProfile(): Promise<any> {
    try {
      const testProfile = {
        first_name: 'Test',
        last_name: 'Founder',
        email: `test-${Date.now()}@example.com`,
        company: 'Test Startup',
        role: 'CEO',
        industry: 'Technology',
        bio: 'This is a test profile created to verify Supabase integration.',
        interests: ['AI', 'SaaS', 'Startups'],
        goals: ['Find cofounders', 'Raise funding', 'Scale business'],
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert([testProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating test profile:', error);
        throw error;
      }

      console.log('✅ Test profile created successfully:', data);
      return data;
    } catch (err) {
      console.error('Error creating test profile:', err);
      throw err;
    }
  },

  // Test pitch submission
  async testPitchSubmission(): Promise<any> {
    try {
      const testPitch = {
        founder_email: 'test@example.com',
        target_type: 'investor',
        target_id: 1,
        target_name: 'Test Investor',
        message: 'This is a test pitch to verify database integration.',
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('pitches')
        .insert([testPitch])
        .select()
        .single();

      if (error) {
        console.error('Error creating test pitch:', error);
        throw error;
      }

      console.log('✅ Test pitch created successfully:', data);
      return data;
    } catch (err) {
      console.error('Error creating test pitch:', err);
      throw err;
    }
  },

  // Get all profiles (for testing)
  async getAllProfiles(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }

      console.log('✅ Profiles fetched successfully:', data?.length || 0);
      return data || [];
    } catch (err) {
      console.error('Error fetching profiles:', err);
      throw err;
    }
  },

  // Get all pitches (for testing)
  async getAllPitches(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('pitches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pitches:', error);
        throw error;
      }

      console.log('✅ Pitches fetched successfully:', data?.length || 0);
      return data || [];
    } catch (err) {
      console.error('Error fetching pitches:', err);
      throw err;
    }
  }
};
