// Calendar Integration Service for Circle X
// Handles meeting scheduling and timezone management

export interface TimeSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isAvailable: boolean;
  timezone: string;
}

export interface MeetingRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  title: string;
  description: string;
  duration: number; // in minutes
  preferredTimes: string[]; // ISO strings
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  meetingLink?: string;
  createdAt: string;
  scheduledFor?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  meetingLink?: string;
  description: string;
  type: 'meeting' | 'event' | 'blocked';
}

export const calendarService = {
  // Get available time slots for a user
  getAvailableSlots(userId: string, date: string, timezone: string = 'Asia/Kolkata'): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0); // 9 AM start
    
    // Generate slots from 9 AM to 6 PM, 30-minute intervals
    for (let i = 0; i < 18; i++) {
      const slotStart = new Date(startDate);
      slotStart.setMinutes(slotStart.getMinutes() + (i * 30));
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);
      
      slots.push({
        id: `slot_${userId}_${slotStart.getTime()}`,
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable: Math.random() > 0.3, // 70% availability for demo
        timezone
      });
    }
    
    return slots;
  },

  // Create a meeting request
  createMeetingRequest(request: Omit<MeetingRequest, 'id' | 'createdAt' | 'status'>): MeetingRequest {
    const meetingRequest: MeetingRequest = {
      ...request,
      id: `meeting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Store in localStorage for demo
    const existingRequests = this.getMeetingRequests();
    existingRequests.push(meetingRequest);
    localStorage.setItem('meeting_requests', JSON.stringify(existingRequests));

    return meetingRequest;
  },

  // Get meeting requests for a user
  getMeetingRequests(): MeetingRequest[] {
    const stored = localStorage.getItem('meeting_requests');
    return stored ? JSON.parse(stored) : [];
  },

  // Get meeting requests for a specific user
  getUserMeetingRequests(userId: string): MeetingRequest[] {
    const allRequests = this.getMeetingRequests();
    return allRequests.filter(req => 
      req.requesterId === userId || req.recipientId === userId
    );
  },

  // Update meeting request status
  updateMeetingRequestStatus(requestId: string, status: MeetingRequest['status'], scheduledFor?: string): boolean {
    const requests = this.getMeetingRequests();
    const requestIndex = requests.findIndex(req => req.id === requestId);
    
    if (requestIndex === -1) return false;
    
    requests[requestIndex].status = status;
    if (scheduledFor) {
      requests[requestIndex].scheduledFor = scheduledFor;
    }
    
    localStorage.setItem('meeting_requests', JSON.stringify(requests));
    return true;
  },

  // Generate meeting link (demo implementation)
  generateMeetingLink(): string {
    const roomId = Math.random().toString(36).substr(2, 9);
    return `https://meet.circlex.in/${roomId}`;
  },

  // Get calendar events for a user
  getUserCalendarEvents(userId: string, _startDate: string, _endDate: string): CalendarEvent[] {
    const requests = this.getUserMeetingRequests(userId);
    const events: CalendarEvent[] = [];

    requests.forEach(request => {
      if (request.status === 'accepted' && request.scheduledFor) {
        const startTime = new Date(request.scheduledFor);
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + request.duration);

        events.push({
          id: request.id,
          title: request.title,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          attendees: [request.requesterEmail, request.recipientEmail],
          meetingLink: request.meetingLink,
          description: request.description,
          type: 'meeting'
        });
      }
    });

    return events;
  },

  // Check if a time slot is available
  isSlotAvailable(userId: string, startTime: string, endTime: string): boolean {
    const events = this.getUserCalendarEvents(userId, startTime, endTime);
    const requestedStart = new Date(startTime);
    const requestedEnd = new Date(endTime);

    return !events.some(event => {
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
      
      return (requestedStart < eventEnd && requestedEnd > eventStart);
    });
  },

  // Get timezone offset for Indian cities
  getTimezoneOffset(city: string): string {
    const timezones: { [key: string]: string } = {
      'Mumbai': 'Asia/Kolkata',
      'Delhi': 'Asia/Kolkata',
      'Bangalore': 'Asia/Kolkata',
      'Hyderabad': 'Asia/Kolkata',
      'Chennai': 'Asia/Kolkata',
      'Pune': 'Asia/Kolkata',
      'Gurgaon': 'Asia/Kolkata',
      'Chandigarh': 'Asia/Kolkata',
      'Kolkata': 'Asia/Kolkata'
    };
    
    return timezones[city] || 'Asia/Kolkata';
  },

  // Format time for display
  formatTimeForDisplay(isoString: string, timezone: string = 'Asia/Kolkata'): string {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  },

  // Get suggested meeting times based on both users' availability
  getSuggestedTimes(user1Id: string, user2Id: string, date: string): TimeSlot[] {
    const user1Slots = this.getAvailableSlots(user1Id, date);
    const user2Slots = this.getAvailableSlots(user2Id, date);
    
    // Find common available slots
    return user1Slots.filter(slot1 => 
      user2Slots.some(slot2 => 
        slot1.startTime === slot2.startTime && 
        slot1.isAvailable && 
        slot2.isAvailable
      )
    );
  }
};
