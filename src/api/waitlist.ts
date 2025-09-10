import { supabase } from '../supabase';

export interface WaitlistEntry {
  name: string;
  email: string;
  role: 'Founder' | 'Mentor' | 'Investor';
  city: string;
  bio?: string;
  referral?: string;
}

export async function POST(request: Request) {
  try {
    const body: WaitlistEntry = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.role || !body.city) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert into waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          name: body.name,
          email: body.email,
          role: body.role,
          city: body.city,
          bio: body.bio || null,
          referral: body.referral || null,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save to waitlist' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
