import { useState } from "react";
import Layout from "../components/Layout";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      newConnections: true,
      messages: true,
      profileViews: false,
      weeklyDigest: true,
      emailNotifications: true
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      allowMessages: true,
      showLastSeen: false
    },
    preferences: {
      theme: "dark",
      language: "en",
      timezone: "PST",
      dateFormat: "MM/DD/YYYY"
    },
    account: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      twoFactorAuth: false,
      dataExport: false
    }
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  return (
    <Layout>
      <div style={{ color: "#fff", maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Settings
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Notifications */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Notifications
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                    {key === "newConnections" && "Get notified when someone connects with you"}
                    {key === "messages" && "Receive notifications for new messages"}
                    {key === "profileViews" && "Get notified when someone views your profile"}
                    {key === "weeklyDigest" && "Receive weekly summary of your activity"}
                    {key === "emailNotifications" && "Receive notifications via email"}
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "50px", height: "24px" }}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange(key, e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: value ? "#10b981" : "rgba(255,255,255,0.2)",
                    borderRadius: "24px",
                    transition: "0.3s"
                  }}>
                    <span style={{
                      position: "absolute",
                      content: '""',
                      height: "18px",
                      width: "18px",
                      left: value ? "26px" : "3px",
                      bottom: "3px",
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "0.3s"
                    }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Privacy
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Profile Visibility */}
            <div>
              <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "8px" }}>
                Profile Visibility
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {["public", "connections", "private"].map((option) => (
                  <label key={option} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={option}
                      checked={settings.privacy.profileVisibility === option}
                      onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                      style={{ accentColor: "#10b981" }}
                    />
                    <span style={{ fontSize: "14px", color: "#fff", textTransform: "capitalize" }}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Privacy Settings */}
            {Object.entries(settings.privacy).filter(([key]) => key !== "profileVisibility").map(([key, value]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                    {key === "showOnlineStatus" && "Show when you're online to other users"}
                    {key === "allowMessages" && "Allow other users to send you messages"}
                    {key === "showLastSeen" && "Show when you were last active"}
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "50px", height: "24px" }}>
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: value ? "#10b981" : "rgba(255,255,255,0.2)",
                    borderRadius: "24px",
                    transition: "0.3s"
                  }}>
                    <span style={{
                      position: "absolute",
                      content: '""',
                      height: "18px",
                      width: "18px",
                      left: value ? "26px" : "3px",
                      bottom: "3px",
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "0.3s"
                    }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Preferences
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {/* Theme */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Theme
              </label>
              <select
                value={settings.preferences.theme}
                onChange={(e) => handlePreferenceChange("theme", e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange("language", e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Timezone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              >
                <option value="PST">Pacific (PST)</option>
                <option value="MST">Mountain (MST)</option>
                <option value="CST">Central (CST)</option>
                <option value="EST">Eastern (EST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            {/* Date Format */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Date Format
              </label>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => handlePreferenceChange("dateFormat", e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Account
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Email Address
              </label>
              <input
                type="email"
                value={settings.account.email}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  account: { ...prev.account, email: e.target.value }
                }))}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.account.phone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  account: { ...prev.account, phone: e.target.value }
                }))}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                  Two-Factor Authentication
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Add an extra layer of security to your account
                </div>
              </div>
              <button
                style={{
                  background: settings.account.twoFactorAuth ? "#10b981" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: settings.account.twoFactorAuth ? "#000" : "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => setSettings(prev => ({
                  ...prev,
                  account: { ...prev.account, twoFactorAuth: !prev.account.twoFactorAuth }
                }))}
              >
                {settings.account.twoFactorAuth ? "Enabled" : "Enable"}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          borderRadius: "16px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 16px", color: "#ef4444" }}>
            Danger Zone
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                  Export Data
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Download a copy of your data
                </div>
              </div>
              <button
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Export
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                  Delete Account
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Permanently delete your account and all data
                </div>
              </div>
              <button
                style={{
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
