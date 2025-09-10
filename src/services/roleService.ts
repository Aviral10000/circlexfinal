import { supabase } from '../supabase';

export type UserRole = 'Founder' | 'Mentor' | 'Investor';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  title?: string;
  industry?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

class RoleService {
  /**
   * Get user's role from their profile
   */
  async getUserRole(userId: string): Promise<UserRole | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role || 'Founder'; // Default to Founder if no role set
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return null;
    }
  }

  /**
   * Update user's role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return false;
    }
  }

  /**
   * Get user's complete profile
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  /**
   * Create or update user profile
   */
  async createOrUpdateProfile(profile: Partial<UserProfile>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating/updating profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
      return false;
    }
  }

  /**
   * Get dashboard route based on user role
   */
  getDashboardRoute(role: UserRole): string {
    switch (role) {
      case 'Founder':
        return '/founder';
      case 'Mentor':
        return '/mentor-dashboard';
      case 'Investor':
        return '/investor-dashboard';
      default:
        return '/onboarding';
    }
  }

  /**
   * Check if user has completed onboarding (has a role set)
   */
  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    try {
      const role = await this.getUserRole(userId);
      return role !== null && role !== undefined;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  /**
   * Get all users by role
   */
  async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', role);

      if (error) {
        console.error('Error fetching users by role:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUsersByRole:', error);
      return [];
    }
  }

  /**
   * Get mentorship requests for a mentor
   */
  async getMentorshipRequests(mentorId: string) {
    try {
      const { data, error } = await supabase
        .from('mentorship_requests')
        .select(`
          *,
          founder:profiles!mentorship_requests_founder_id_fkey(*)
        `)
        .eq('mentor_id', mentorId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mentorship requests:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMentorshipRequests:', error);
      return [];
    }
  }

  /**
   * Get investment interests for an investor
   */
  async getInvestmentInterests(investorId: string) {
    try {
      const { data, error } = await supabase
        .from('investment_interests')
        .select(`
          *,
          founder:profiles!investment_interests_founder_id_fkey(*)
        `)
        .eq('investor_id', investorId)
        .eq('interest_level', 'interested')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investment interests:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getInvestmentInterests:', error);
      return [];
    }
  }
}

export const roleService = new RoleService();
