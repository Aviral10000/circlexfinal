import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { reportError } from "../sentry";
import { pitchService } from "../services/pitchService";
import type { Pitch, Application } from "../services/pitchService";
import { testService } from "../services/testService";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  bio: string;
  profile_url: string;
  interests: string[];
  goals: string[];
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [activeTab, setActiveTab] = useState<'profiles' | 'pitches' | 'applications'>('profiles');

  useEffect(() => {
    if (activeTab === 'profiles') {
      fetchProfiles();
    } else if (activeTab === 'pitches') {
      fetchPitches();
    } else if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [filter, activeTab]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      let query = supabase.from('profiles').select('*');
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        setProfiles(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPitches = async () => {
    try {
      setLoading(true);
      const data = await pitchService.getAllPitches();
      setPitches(data);
    } catch (err) {
      console.error('Error fetching pitches:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await pitchService.getAllApplications();
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        reportError(error, { step: 'admin-update-status', profileId: id, status });
      } else {
        // Refresh the list
        fetchProfiles();
      }
    } catch (err) {
      console.error('Error:', err);
      reportError(err as Error, { step: 'admin-update-status', profileId: id, status });
    }
  };

  const updatePitchStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await pitchService.updatePitchStatus(id, status);
      fetchPitches();
    } catch (err) {
      console.error('Error updating pitch status:', err);
      reportError(err as Error);
    }
  };

  const updateApplicationStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await pitchService.updateApplicationStatus(id, status);
      fetchApplications();
    } catch (err) {
      console.error('Error updating application status:', err);
      reportError(err as Error);
    }
  };

  const testSupabaseConnection = async () => {
    try {
      const isConnected = await testService.testConnection();
      if (isConnected) {
        alert('✅ Supabase connection successful!');
      } else {
        alert('❌ Supabase connection failed!');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      alert('❌ Connection test failed!');
    }
  };

  const createTestAccount = async () => {
    try {
      const testProfile = await testService.createTestProfile();
      alert(`✅ Test account created successfully!\nEmail: ${testProfile.email}`);
      fetchProfiles();
    } catch (err) {
      console.error('Test account creation error:', err);
      alert('❌ Failed to create test account!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Loading applications...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Header */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ 
          fontSize: "24px", 
          fontWeight: 300, 
          color: "#fff"
        }}>
          Circle X Admin
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={testSupabaseConnection}
            style={{
              background: "#10b981",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginRight: "8px"
            }}
          >
            🔗 Test DB
          </button>
          <button
            onClick={createTestAccount}
            style={{
              background: "#3b82f6",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginRight: "8px"
            }}
          >
            👤 Test Account
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            All ({profiles.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`btn ${filter === 'approved' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`btn ${filter === 'rejected' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Rejected
          </button>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "0 24px"
      }}>
        <button
          onClick={() => setActiveTab('profiles')}
          style={{
            padding: "16px 24px",
            background: activeTab === 'profiles' ? "rgba(16, 185, 129, 0.1)" : "transparent",
            border: "none",
            color: activeTab === 'profiles' ? "#10b981" : "rgba(255,255,255,0.6)",
            fontSize: "16px",
            fontWeight: activeTab === 'profiles' ? "600" : "400",
            cursor: "pointer",
            borderBottom: activeTab === 'profiles' ? "2px solid #10b981" : "2px solid transparent"
          }}
        >
          Profiles ({profiles.length})
        </button>
        <button
          onClick={() => setActiveTab('pitches')}
          style={{
            padding: "16px 24px",
            background: activeTab === 'pitches' ? "rgba(16, 185, 129, 0.1)" : "transparent",
            border: "none",
            color: activeTab === 'pitches' ? "#10b981" : "rgba(255,255,255,0.6)",
            fontSize: "16px",
            fontWeight: activeTab === 'pitches' ? "600" : "400",
            cursor: "pointer",
            borderBottom: activeTab === 'pitches' ? "2px solid #10b981" : "2px solid transparent"
          }}
        >
          Pitches ({pitches.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          style={{
            padding: "16px 24px",
            background: activeTab === 'applications' ? "rgba(16, 185, 129, 0.1)" : "transparent",
            border: "none",
            color: activeTab === 'applications' ? "#10b981" : "rgba(255,255,255,0.6)",
            fontSize: "16px",
            fontWeight: activeTab === 'applications' ? "600" : "400",
            cursor: "pointer",
            borderBottom: activeTab === 'applications' ? "2px solid #10b981" : "2px solid transparent"
          }}
        >
          Applications ({applications.length})
        </button>
      </div>

      {/* Stats */}
      <div style={{ padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#f59e0b" }}>
              {profiles.filter(p => p.status === 'pending').length}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Pending</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#10b981" }}>
              {profiles.filter(p => p.status === 'approved').length}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Approved</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#ef4444" }}>
              {profiles.filter(p => p.status === 'rejected').length}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Rejected</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#fff" }}>
              {profiles.length}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Total</div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'profiles' && (
          <div style={{ display: "grid", gap: "16px" }}>
            {profiles.map((profile) => (
            <div key={profile.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: "500", margin: "0 0 4px" }}>
                    {profile.first_name} {profile.last_name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>
                    {profile.role} at {profile.company}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0" }}>
                    {profile.email} • {profile.industry}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                    background: getStatusColor(profile.status),
                    color: "#fff"
                  }}>
                    {profile.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {profile.bio && (
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                    {profile.bio}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                {profile.interests.map((interest, index) => (
                  <span key={index} style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)"
                  }}>
                    {interest}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                {profile.goals.map((goal, index) => (
                  <span key={index} style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    background: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.9)"
                  }}>
                    {goal}
                  </span>
                ))}
              </div>

              {profile.status === 'pending' && (
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => updateStatus(profile.id, 'approved')}
                    className="btn btn-primary"
                    style={{ fontSize: "14px", padding: "8px 16px" }}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(profile.id, 'rejected')}
                    className="btn btn-outline"
                    style={{ fontSize: "14px", padding: "8px 16px", color: "#ef4444", borderColor: "#ef4444" }}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}

              <div style={{ 
                marginTop: "12px", 
                paddingTop: "12px", 
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)"
              }}>
                Applied: {new Date(profile.created_at).toLocaleDateString()}
                {profile.profile_url && (
                  <span style={{ marginLeft: "16px" }}>
                    <a href={profile.profile_url} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.7)" }}>
                      LinkedIn Profile →
                    </a>
                  </span>
                )}
              </div>
            </div>
            ))}
          </div>
        )}

        {activeTab === 'pitches' && (
          <div style={{ display: "grid", gap: "16px" }}>
            {pitches.map((pitch) => (
              <div key={pitch.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "500", margin: "0 0 4px" }}>
                      Pitch to {pitch.target_name}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>
                      From: {pitch.founder_email}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0" }}>
                      Type: {pitch.target_type} • ID: {pitch.target_id}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500",
                      background: getStatusColor(pitch.status),
                      color: "#fff"
                    }}>
                      {pitch.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                    {pitch.message}
                  </p>
                </div>

                {pitch.pitch_deck_link && (
                  <div style={{ marginBottom: "16px" }}>
                    <a 
                      href={pitch.pitch_deck_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: "#10b981", textDecoration: "none" }}
                    >
                      📄 View Pitch Deck →
                    </a>
                  </div>
                )}

                {pitch.status === 'pending' && (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => updatePitchStatus(pitch.id!, 'approved')}
                      className="btn btn-primary"
                      style={{ fontSize: "14px", padding: "8px 16px" }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => updatePitchStatus(pitch.id!, 'rejected')}
                      className="btn btn-outline"
                      style={{ fontSize: "14px", padding: "8px 16px", color: "#ef4444", borderColor: "#ef4444" }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}

                <div style={{ 
                  marginTop: "12px", 
                  paddingTop: "12px", 
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)"
                }}>
                  Submitted: {pitch.created_at ? new Date(pitch.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div style={{ display: "grid", gap: "16px" }}>
            {applications.map((application) => (
              <div key={application.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "500", margin: "0 0 4px" }}>
                      {application.target_type === 'mentor' ? 'Mentorship' : 'Cofounder'} Application to {application.target_name}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>
                      From: {application.founder_email}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0" }}>
                      Type: {application.target_type} • ID: {application.target_id}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500",
                      background: getStatusColor(application.status),
                      color: "#fff"
                    }}>
                      {application.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                    {application.message}
                  </p>
                </div>

                {application.status === 'pending' && (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => updateApplicationStatus(application.id!, 'approved')}
                      className="btn btn-primary"
                      style={{ fontSize: "14px", padding: "8px 16px" }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id!, 'rejected')}
                      className="btn btn-outline"
                      style={{ fontSize: "14px", padding: "8px 16px", color: "#ef4444", borderColor: "#ef4444" }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}

                <div style={{ 
                  marginTop: "12px", 
                  paddingTop: "12px", 
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)"
                }}>
                  Submitted: {application.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        )}

        {((activeTab === 'profiles' && profiles.length === 0) || 
          (activeTab === 'pitches' && pitches.length === 0) || 
          (activeTab === 'applications' && applications.length === 0)) && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.5)" }}>
            No {activeTab} found.
          </div>
        )}
      </div>
    </div>
  );
}


