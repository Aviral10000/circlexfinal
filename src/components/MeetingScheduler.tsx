import { useState, useEffect } from "react";
import { calendarService, type TimeSlot } from "../services/calendarService";

interface MeetingSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
}

export default function MeetingScheduler({
  isOpen,
  onClose,
  recipientId,
  recipientName,
  recipientEmail,
  requesterId,
  requesterName,
  requesterEmail
}: MeetingSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && selectedDate) {
      const slots = calendarService.getAvailableSlots(recipientId, selectedDate);
      setAvailableSlots(slots);
    }
  }, [isOpen, selectedDate, recipientId]);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSlots.length === 0 || !meetingTitle.trim()) return;

    setIsSubmitting(true);

    try {
      const meetingRequest = calendarService.createMeetingRequest({
        requesterId,
        requesterName,
        requesterEmail,
        recipientId,
        recipientName,
        recipientEmail,
        title: meetingTitle,
        description: meetingDescription,
        duration,
        preferredTimes: selectedSlots.map(slotId => {
          const slot = availableSlots.find(s => s.id === slotId);
          return slot?.startTime || '';
        }).filter(Boolean)
      });

      console.log('Meeting request created:', meetingRequest);
      setSubmitted(true);
      
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setSelectedSlots([]);
        setMeetingTitle("");
        setMeetingDescription("");
      }, 2000);

    } catch (error) {
      console.error('Error creating meeting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(0, 0, 0, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "80vh",
        overflow: "auto",
        backdropFilter: "blur(10px)"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <h2 style={{
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "600",
            margin: 0
          }}>
            Schedule Meeting
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h3 style={{ color: "#10b981", margin: "0 0 8px" }}>Meeting Request Sent!</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>
              {recipientName} will receive your meeting request and respond soon.
            </p>
          </div>
        ) : (
          <>
            {/* Meeting Details */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                Meeting with {recipientName}
              </label>
              
              <input
                type="text"
                placeholder="Meeting title (e.g., 'Discuss Partnership Opportunity')"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}
              />
              
              <textarea
                placeholder="Meeting description (optional)"
                value={meetingDescription}
                onChange={(e) => setMeetingDescription(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Duration */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px"
                }}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* Time Slots */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "12px"
              }}>
                Available Time Slots (Select up to 3)
              </label>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "8px",
                maxHeight: "200px",
                overflow: "auto"
              }}>
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlots.includes(slot.id);
                  const isAvailable = slot.isAvailable;
                  
                  return (
                    <button
                      key={slot.id}
                      onClick={() => isAvailable && handleSlotSelect(slot.id)}
                      disabled={!isAvailable || (selectedSlots.length >= 3 && !isSelected)}
                      style={{
                        padding: "8px 12px",
                        background: isSelected 
                          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                          : isAvailable 
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.02)",
                        border: isSelected 
                          ? "1px solid #10b981"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        color: isSelected 
                          ? "#ffffff"
                          : isAvailable 
                            ? "#ffffff"
                            : "rgba(255, 255, 255, 0.3)",
                        fontSize: "12px",
                        cursor: isAvailable ? "pointer" : "not-allowed",
                        opacity: isAvailable ? 1 : 0.5,
                        transition: "all 0.2s ease"
                      }}
                    >
                      {new Date(slot.startTime).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={selectedSlots.length === 0 || !meetingTitle.trim() || isSubmitting}
              style={{
                width: "100%",
                padding: "12px",
                background: selectedSlots.length > 0 && meetingTitle.trim()
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: selectedSlots.length > 0 && meetingTitle.trim() ? "pointer" : "not-allowed",
                opacity: selectedSlots.length > 0 && meetingTitle.trim() ? 1 : 0.5,
                transition: "all 0.2s ease"
              }}
            >
              {isSubmitting ? "Sending..." : `Send Meeting Request (${selectedSlots.length} time${selectedSlots.length !== 1 ? 's' : ''})`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
