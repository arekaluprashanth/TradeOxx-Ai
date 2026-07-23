import { create } from 'zustand';

export interface AiMessage {
  id: string;
  role: 'USER' | 'AI' | 'SYSTEM';
  content: string;
  createdAt?: string;
}

export interface AiConversation {
  id: string;
  title: string;
  agentType: string;
  isPinned: boolean;
  messages: AiMessage[];
  updatedAt?: string;
}

interface AiState {
  conversations: AiConversation[];
  activeConversation: AiConversation | null;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;

  fetchConversations: () => Promise<void>;
  fetchConversation: (id: string) => Promise<void>;
  createConversation: (title: string, agentType: string) => Promise<string>;
  sendMessage: (conversationId: string, content: string, agentType: string) => Promise<void>;
}

// In a real app, you would get this from a configured auth store or cookie
const getAuthToken = () => localStorage.getItem('token') || '';

export const useAiStore = create<AiState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  isLoading: false,
  isStreaming: false,
  error: null,

  fetchConversations: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/ai/conversations', {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      set({ conversations: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchConversation: async (id: string) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`http://localhost:3001/ai/conversations/${id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch conversation');
      const data = await res.json();
      set({ activeConversation: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  createConversation: async (title: string, agentType: string) => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/ai/conversations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}` 
        },
        body: JSON.stringify({ title, agentType }),
      });
      if (!res.ok) throw new Error('Failed to create conversation');
      const data = await res.json();
      set((state) => ({ 
        conversations: [data, ...state.conversations],
        activeConversation: data,
        isLoading: false 
      }));
      return data.id;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  sendMessage: async (conversationId: string, content: string, agentType: string) => {
    // 1. Optimistically append user message
    const tempUserMsgId = Math.random().toString(36).substring(7);
    const userMessage: AiMessage = { id: tempUserMsgId, role: 'USER', content };
    
    // Create an empty AI message to stream into
    const tempAiMsgId = Math.random().toString(36).substring(7);
    const aiMessage: AiMessage = { id: tempAiMsgId, role: 'AI', content: '' };
    
    set((state) => {
      if (!state.activeConversation) return state;
      return {
        isStreaming: true,
        activeConversation: {
          ...state.activeConversation,
          messages: [...state.activeConversation.messages, userMessage, aiMessage],
        }
      };
    });

    try {
      // 2. Persist user message to backend
      await fetch(`http://localhost:3001/ai/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}` 
        },
        body: JSON.stringify({ content, role: 'USER' }),
      });

      // 3. Initiate SSE for streaming AI response
      const token = getAuthToken();
      // Since it's SSE, we normally can't easily pass Authorization headers in browser native EventSource.
      // For this robust V1.0, we will use a fetch stream reader instead of native EventSource to support headers.
      
      // Wait, NestJS @Sse expects EventSource format. 
      // We will parse the raw stream manually.
      const url = `http://localhost:3001/ai/conversations/${conversationId}/stream?prompt=${encodeURIComponent(content)}&agentType=${encodeURIComponent(agentType)}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let finalAiContent = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkString = decoder.decode(value, { stream: true });
          
          // NestJS SSE sends lines like "data: {"chunk":"Hello","isDone":false}\n\n"
          const lines = chunkString.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                finalAiContent += data.chunk;
                
                // Update active conversation in store
                set((state) => {
                  if (!state.activeConversation) return state;
                  const newMessages = state.activeConversation.messages.map(msg => 
                    msg.id === tempAiMsgId ? { ...msg, content: finalAiContent } : msg
                  );
                  return {
                    activeConversation: {
                      ...state.activeConversation,
                      messages: newMessages
                    }
                  };
                });
                
              } catch (e) {
                // Ignore parse errors on incomplete chunks if any
              }
            }
          }
        }
      }

      // 4. Persist AI message to backend
      await fetch(`http://localhost:3001/ai/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}` 
        },
        body: JSON.stringify({ content: finalAiContent, role: 'AI' }),
      });

      set({ isStreaming: false });

    } catch (err: any) {
      console.error(err);
      set({ error: err.message, isStreaming: false });
    }
  }
}));
