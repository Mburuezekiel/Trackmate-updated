// types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    avatar?: string;
    projects: string[];
  }
  
  export interface ChatMessage {
    id: string;
    senderId: string;
    message: string;
    timestamp: Date;
  }
  
  export interface Team {
    id: string;
    name: string;
    members: User[];
    chat: ChatMessage[];
  }
  