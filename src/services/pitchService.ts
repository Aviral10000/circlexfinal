import { supabase } from '../supabase';

export interface Pitch {
  id?: number;
  founder_email: string;
  target_type: 'investor' | 'mentor' | 'cofounder';
  target_id: number;
  target_name: string;
  message: string;
  pitch_deck_link?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface Application {
  id?: number;
  founder_email: string;
  target_type: 'mentor' | 'cofounder';
  target_id: number;
  target_name: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export const pitchService = {
  // Submit a pitch to an investor
  async submitPitch(pitch: Omit<Pitch, 'id' | 'created_at' | 'updated_at'>): Promise<Pitch> {
    const { data, error } = await supabase
      .from('pitches')
      .insert([pitch])
      .select()
      .single();

    if (error) {
      console.error('Error submitting pitch:', error);
      throw new Error('Failed to submit pitch');
    }

    return data;
  },

  // Submit a mentorship application
  async submitApplication(application: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application> {
    const { data, error } = await supabase
      .from('applications')
      .insert([application])
      .select()
      .single();

    if (error) {
      console.error('Error submitting application:', error);
      throw new Error('Failed to submit application');
    }

    return data;
  },

  // Get all pitches for admin dashboard
  async getAllPitches(): Promise<Pitch[]> {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pitches:', error);
      throw new Error('Failed to fetch pitches');
    }

    return data || [];
  },

  // Get all applications for admin dashboard
  async getAllApplications(): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Failed to fetch applications');
    }

    return data || [];
  },

  // Update pitch status (admin only)
  async updatePitchStatus(pitchId: number, status: 'approved' | 'rejected'): Promise<void> {
    const { error } = await supabase
      .from('pitches')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', pitchId);

    if (error) {
      console.error('Error updating pitch status:', error);
      throw new Error('Failed to update pitch status');
    }
  },

  // Update application status (admin only)
  async updateApplicationStatus(applicationId: number, status: 'approved' | 'rejected'): Promise<void> {
    const { error } = await supabase
      .from('applications')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    if (error) {
      console.error('Error updating application status:', error);
      throw new Error('Failed to update application status');
    }
  },

  // Get founder's pitches
  async getFounderPitches(founderEmail: string): Promise<Pitch[]> {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('founder_email', founderEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching founder pitches:', error);
      throw new Error('Failed to fetch founder pitches');
    }

    return data || [];
  },

  // Get founder's applications
  async getFounderApplications(founderEmail: string): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('founder_email', founderEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching founder applications:', error);
      throw new Error('Failed to fetch founder applications');
    }

    return data || [];
  }
};
