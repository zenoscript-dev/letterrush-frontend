import { Socket } from 'socket.io-client';
import { create } from 'zustand';
import SocketService from '../services/socket.service';
import { Message } from './useChatStore';

export interface LeaderBoard {
  nickname: string;
  rank: number;
  score: number;
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  // getRoomList: () => Promise<void>;
  connectSocketAndJoinRoom: (roomId: string, nickname: string) => void;
  sendChatMessage: (message: string, nickName: string) => void;
  submitWord: (word: string, nickName: string) => void;
  leaveRoom: () => void;
  disconnectSocket: (nickName: string) => void;
  messages: Message[] | [];
  numberOfPlayers: number;
  randomWord: string;
  nickname: string;
  leaderBoard: {
    loading: boolean;
    data: LeaderBoard[];
  };
  score: number;
  rank: number;
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
  nickname: '',
  leaderBoard: {
    loading: false,
    data: [],
  },
  score: 0,
  rank: 0,
  // getRoomList: async () => {
  //   try {
  //     const response: { success: boolean; data: Room[]; error: string } =
  //       await fetch('http://localhost:3700/api/v1/rooms').then((res) =>
  //         res.json(),
  //       );
  //     if (!response.success) {
  //       throw new Error('Failed to fetch room list');
  //     }
  //     set({ roomList: response.data });
  //   } catch (error) {
  //     set({ error: 'Failed to fetch room list' });
  //   }
  // },

  connectSocketAndJoinRoom: async (roomId: string, nickname: string) => {
    try {
      set({ isConnecting: true, error: null });
      set({ nickname });

      const socket = await SocketService.getInstance().connect(
        roomId,
        nickname,
      );

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

      socket.on('score', (data) => {
        set({
          score: data,
        });
      });

      socket.on('leader-board', (data) => {
        console.log(data, 'sadasdasdaasdadas');
        set({
          leaderBoard: {
            loading: false,
            data: data,
          },
        });

        data?.forEach((item: LeaderBoard) => {
          if (item.nickname === nickname) {
            set({
              rank: item.rank,
            });
          }
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
}));
