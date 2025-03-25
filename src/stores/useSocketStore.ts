import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

export interface Room {
  roomId: string;
  roomName: string;
  roomSize: number;
}

export interface Message {
  id: string;
  message: string;
  roomId: string;
  nickName: string;
  type: MessageType;
}

export enum MessageType {
  CHAT = 'chat',
  SUBMIT_WORD = 'submit-word',
  LEAVE_ROOM = 'leave-room',
  WORD_MATCH = 'word-match',
  WORD_NOT_MATCH = 'word-not-match',
  START_GAME = 'start-game',
  RANDOM_WORD = 'random-word',
  PLAYER_JOINED = 'player-joined',
  PLAYER_LEFT = 'player-left',
  NUMBER_OF_PLAYERS = 'number-of-players',
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  roomList: Room[];
  getRoomList: () => Promise<void>;
  connectSocketAndJoinRoom: (roomId: string, nickname: string) => void;
  sendChatMessage: (message: string, nickName: string) => void;
  submitWord: (word: string, nickName: string) => void;
  leaveRoom: () => void;
  getRooms: () => Promise<Room[]>;
  disconnectSocket: (nickName: string) => void;
  messages: Message[] | [];
  numberOfPlayers: number;
  randomWord: string;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  roomList: [],
  messages: [],
  numberOfPlayers: 0,
  randomWord: '',
  getRoomList: async () => {
    try {
      const response: { success: boolean; data: Room[]; error: string } =
        await fetch('http://localhost:3100/rooms').then((res) => res.json());
      if (!response.success) {
        throw new Error('Failed to fetch room list');
      }
      set({ roomList: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch room list' });
    }
  },

  connectSocketAndJoinRoom: (roomId: string, nickname: string) => {
    try {
      set({ isConnecting: true, error: null });

      const socket = io('http://localhost:4100/game', {
        query: {
          roomId,
          nickname,
        },
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        set({ isConnected: true, isConnecting: false, socket });
      });

      socket.on('connect_error', (error) => {
        set({ error: error.message, isConnecting: false });
      });

      socket.on('error', (error) => {
        set({ error: error.message });
      });

      socket.on('disconnect', () => {
        set({ isConnected: false, socket: null });
      });

      socket.on('chat', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });

      socket.on('player-joined', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });

      socket.on('player-left', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });

      socket.on('number-of-players', (data) => {
        set({
          numberOfPlayers: data,
        });
      });

      socket.on('start-game', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });

      socket.on('random-word', (data) => {
        set({
          randomWord: data,
        });
      });

      socket.on('word-match', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });

      socket.on('word-not-match', (data) => {
        set({
          messages: [...get().messages, data],
        });
      });
    } catch (error) {
      set({ error: 'Failed to connect to socket', isConnecting: false });
    }
  },

  sendChatMessage: (message: string, nickName: string) => {
    const { socket } = get();
    if (!socket) {
      throw new Error('Socket not connected');
    }
    socket.emit('chat', { message, nickname: nickName });
  },

  submitWord: (word: string, nickName: string) => {
    const { socket } = get();
    if (!socket) {
      throw new Error('Socket not connected');
    }
    socket.emit('submit-word', { word, nickname: nickName });
  },

  // disconnect socket
  disconnectSocket: (nickName: string) => {
    const { socket } = get();
    if (!socket) {
      // throw new Error('Socket not connected');
    }
    socket?.emit('disconnect', { nickname: nickName });
  },

  leaveRoom: () => {
    const { socket } = get();
    if (!socket) {
      throw new Error('Socket not connected');
    }
    socket.emit('leaveRoom');
  },
  getRooms: async () => {
    try {
      const response = await fetch('http://localhost:3100/api/v1/rooms');
      const { success, data, error } = await response.json();

      if (!success) {
        throw new Error(error || 'Failed to fetch rooms');
      }

      set({ roomList: data });
      return data;
    } catch (error) {
      set({ error: (error as Error).message || 'Failed to fetch rooms' });
      throw error;
    }
  },
}));
