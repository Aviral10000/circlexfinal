import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  participantId: number;
  participantName: string;
  participantAvatar: string;
  participantTitle: string;
  participantCompany: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export default function Inbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data for conversations
    const mockConversations: Conversation[] = [
      {
        id: 1,
        participantId: 1,
        participantName: "Sarah Chen",
        participantAvatar: "SC",
        participantTitle: "CEO",
        participantCompany: "TechFlow",
        lastMessage: "Thanks for the intro! Let's schedule a call this week.",
        lastMessageTime: "2m ago",
        unreadCount: 0,
        isOnline: true,
        messages: [
          {
            id: 1,
            senderId: 1,
            senderName: "Sarah Chen",
            senderAvatar: "SC",
            content: "Hi! Thanks for connecting. I'd love to learn more about your startup.",
            timestamp: "10:30 AM",
            isRead: true
          },
          {
            id: 2,
            senderId: 0, // Current user
            senderName: "You",
            senderAvatar: "Y",
            content: "Hi Sarah! Great to meet you. I'm working on an AI-powered analytics platform. What's your focus at TechFlow?",
            timestamp: "10:32 AM",
            isRead: true
          },
          {
            id: 3,
            senderId: 1,
            senderName: "Sarah Chen",
            senderAvatar: "SC",
            content: "That sounds fascinating! We're building ML models for predictive analytics in healthcare. There might be some interesting synergies here.",
            timestamp: "10:35 AM",
            isRead: true
          },
          {
            id: 4,
            senderId: 0,
            senderName: "You",
            senderAvatar: "Y",
            content: "Absolutely! Healthcare analytics is a huge market. Would you be interested in a potential collaboration?",
            timestamp: "10:37 AM",
            isRead: true
          },
          {
            id: 5,
            senderId: 1,
            senderName: "Sarah Chen",
            senderAvatar: "SC",
            content: "Thanks for the intro! Let's schedule a call this week.",
            timestamp: "10:40 AM",
            isRead: true
          }
        ]
      },
      {
        id: 2,
        participantId: 2,
        participantName: "Michael Rodriguez",
        participantAvatar: "MR",
        participantTitle: "CTO",
        participantCompany: "DataVault",
        lastMessage: "The partnership proposal looks great. Let's discuss next steps.",
        lastMessageTime: "1h ago",
        unreadCount: 2,
        isOnline: false,
        messages: [
          {
            id: 1,
            senderId: 2,
            senderName: "Michael Rodriguez",
            senderAvatar: "MR",
            content: "Hi! I saw your profile and I'm impressed with your background in fintech.",
            timestamp: "Yesterday",
            isRead: true
          },
          {
            id: 2,
            senderId: 0,
            senderName: "You",
            senderAvatar: "Y",
            content: "Thanks Michael! I'd love to learn more about DataVault's approach to data security.",
            timestamp: "Yesterday",
            isRead: true
          },
          {
            id: 3,
            senderId: 2,
            senderName: "Michael Rodriguez",
            senderAvatar: "MR",
            content: "The partnership proposal looks great. Let's discuss next steps.",
            timestamp: "1h ago",
            isRead: false
          }
        ]
      }
    ];
    setConversations(mockConversations);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: selectedConversation.messages.length + 1,
      senderId: 0,
      senderName: "You",
      senderAvatar: "Y",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTime: "now"
    };

    setSelectedConversation(updatedConversation);
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div style={{ color: "#fff", height: "calc(100vh - 120px)", display: "flex" }}>
        {/* Conversations List */}
        <div style={{ 
          width: "350px", 
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header */}
          <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px" }}>
              Messages
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0 }}>
              {conversations.length} conversations
            </p>
          </div>

          {/* Conversations */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  background: selectedConversation?.id === conversation.id 
                    ? "rgba(16, 185, 129, 0.1)" 
                    : "transparent",
                  transition: "background 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedConversation?.id !== conversation.id) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedConversation?.id !== conversation.id) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Avatar */}
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#10b981",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#fff"
                      }}
                    >
                      {conversation.participantAvatar}
                    </div>
                    {conversation.isOnline && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "#10b981",
                          border: "2px solid #000"
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h3 style={{ 
                        fontSize: "16px", 
                        fontWeight: "600", 
                        margin: 0, 
                        color: "#fff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {conversation.participantName}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <div
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: "bold"
                          }}
                        >
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <p style={{ 
                      color: "rgba(255,255,255,0.6)", 
                      fontSize: "12px", 
                      margin: "0 0 4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {conversation.participantTitle} at {conversation.participantCompany}
                    </p>
                    <p style={{ 
                      color: conversation.unreadCount > 0 ? "#fff" : "rgba(255,255,255,0.5)", 
                      fontSize: "13px", 
                      margin: 0,
                      fontWeight: conversation.unreadCount > 0 ? "500" : "400",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Time */}
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div style={{ 
                padding: "20px", 
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#10b981",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#fff"
                    }}
                  >
                    {selectedConversation.participantAvatar}
                  </div>
                  {selectedConversation.isOnline && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#10b981",
                        border: "2px solid #000"
                      }}
                    ></div>
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 4px", color: "#fff" }}>
                    {selectedConversation.participantName}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0 }}>
                    {selectedConversation.participantTitle} at {selectedConversation.participantCompany}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div style={{ 
                flex: 1, 
                overflowY: "auto", 
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: "flex",
                      justifyContent: message.senderId === 0 ? "flex-end" : "flex-start",
                      alignItems: "flex-start",
                      gap: "8px"
                    }}
                  >
                    {message.senderId !== 0 && (
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#10b981",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#fff",
                          flexShrink: 0
                        }}
                      >
                        {message.senderAvatar}
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "70%",
                        background: message.senderId === 0 
                          ? "#10b981" 
                          : "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        border: message.senderId === 0 
                          ? "none" 
                          : "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      <p style={{ 
                        margin: 0, 
                        fontSize: "14px", 
                        lineHeight: 1.4,
                        color: message.senderId === 0 ? "#000" : "#fff"
                      }}>
                        {message.content}
                      </p>
                      <span style={{ 
                        fontSize: "11px", 
                        color: message.senderId === 0 
                          ? "rgba(0,0,0,0.6)" 
                          : "rgba(255,255,255,0.4)",
                        marginTop: "4px",
                        display: "block"
                      }}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div style={{ 
                padding: "20px", 
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                gap: "12px"
              }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  style={{
                    background: newMessage.trim() ? "#10b981" : "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    color: newMessage.trim() ? "#000" : "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: newMessage.trim() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease"
                  }}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{ 
              flex: 1, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center"
            }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "350px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>💬</div>
              <h3 style={{ 
                fontSize: "22px", 
                margin: "0 0 10px", 
                color: "#fff",
                fontWeight: "600",
                letterSpacing: "-0.3px"
              }}>
                Select a conversation
              </h3>
              <p style={{ 
                color: "rgba(255,255,255,0.7)", 
                fontSize: "14px",
                margin: 0,
                lineHeight: "1.4"
              }}>
                Choose a conversation from the list to start messaging
              </p>
            </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
