import { create } from 'zustand';
import type { User } from '../types/types';

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

interface TeamMember extends User {
  chat: ChatMessage[]; // Add chat messages for each member
}

interface TeamState {
  members: TeamMember[];
  addMember: (member: TeamMember) => void;
  updateMember: (memberId: string, updates: Partial<TeamMember>) => void;
  removeMember: (memberId: string) => void;
  addMessage: (memberId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void; // Updated to reference members
}

// Create the Zustand store
export const useTeamStore = create<TeamState>((set) => ({
  members: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      phone: '+1 234 567 890',
      projects: ['Website Redesign', 'Mobile App'],
      chat: [], // Initialize an empty chat array
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      phone: '+1 234 567 891',
      projects: ['API Integration', 'Database Migration'],
      chat: [], // Initialize an empty chat array
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
      phone: '+1 234 567 892',
      projects: ['Brand Guidelines', 'UI Kit'],
      chat: [], // Initialize an empty chat array
    },
  ],
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
  updateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member
      ),
    })),
  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== memberId),
    })),
  addMessage: (memberId, message) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              chat: [
                ...member.chat,
                { ...message, id: `${Date.now()}`, timestamp: new Date() }, // Generate a unique ID and timestamp
              ],
            }
          : member
      ),
    })),
}));
