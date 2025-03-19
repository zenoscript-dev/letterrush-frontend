import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export interface Room {
  roomId: string;
  roomName: string;
  roomSize: number;
}

interface SocketState {
  userId: string;
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  totalActiveUsersForRoom: number;
  roomList: Room[];
  navigateTo: any;

  connectSocketAndJoinRoom: (roomId: string) => void;
  disconnectSocket: () => void;
  leaveRoom: () => void;
  getTotalActiveUsersForRoom: (roomId: string) => void;
  getRoomList: () => void;
}

// Socket Events Enum
enum SocketListenerEventsEnum {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  ROOM_JOINED = 'room-joined',
  ROOM_LEFT = 'room-left',
  STARTING_GAME = 'starting-game',
  TOTAL_ACTIVE_USERS_FOR_ROOM = 'total-active-users-in-room',
  ROOM_LIST = 'room-list',
  CONNECTED_TO_SOCKET = 'connected-to-socket',
  CONNECTION_ERROR = 'connection-error',
  WAITING_FOR_PLAYERS = 'waiting-for-players',
}

enum SocketEmitterEventsEnum {
  DISCONNECT = 'disconnect',
  RECONNECT = 'reconnect',
  LEAVE_ROOM = 'leave-room',
  JOIN_ROOM = 'join-room',
  GET_TOTAL_ACTIVE_USERS_FOR_ROOM = 'get-total-active-users-in-room',
  GET_ROOM_LIST = 'get-room-list',
}

// Generate or retrieve userId from localStorage
const getOrCreateUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('userId', userId);
  }
  return userId;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  userId: getOrCreateUserId(),
  socket: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  totalActiveUsersForRoom: 0,
  roomList: [],
  navigateTo: null,

  connectSocketAndJoinRoom: (roomId: string) => {
    const userId = get().userId;
    if (!userId) {
      console.error('❌ userId is missing');
      return;
    }

    if (get().socket) {
      return set({ isConnected: true, isConnecting: false });
    }

    console.log(`🔌 Connecting socket as ${userId}...`);

    let socket;
    try {
      socket = io('ws://localhost:4100/game', {
        transports: ['websocket'],
        query: { userId, roomId },
      });
    } catch (error) {
      console.error('Failed to connect socket:', error);
      set({ error: 'Failed to establish socket connection' });
      return;
    }

    set({
      isConnecting: false,
      socket,
      isConnected: true,
    });

    // Attach event listeners
    socket.on(SocketListenerEventsEnum.CONNECT, () => {
      console.log('✅ Connected to socket');
      set({ isConnected: true, isConnecting: false });
    });

    socket.on(SocketListenerEventsEnum.DISCONNECT, () => {
      console.log('❌ Disconnected from socket');
      set({ isConnected: false, socket: null, isConnecting: false });
    });

    socket.on(SocketListenerEventsEnum.ERROR, (error) => {
      console.error('⚠️ Socket error:', error);
      set({ error: error.message });
    });

    socket.on(
      SocketListenerEventsEnum.TOTAL_ACTIVE_USERS_FOR_ROOM,
      ({ totalUsers }) => {
        set({ totalActiveUsersForRoom: totalUsers });
      },
    );

    socket.on(SocketListenerEventsEnum.ROOM_LIST, ({ rooms }) => {
      set({ roomList: rooms });
    });

    socket.on(SocketListenerEventsEnum.ROOM_JOINED, ({ roomId }) => {
      console.log(`📢 Joined room: ${roomId}`);
    });

    socket.on(SocketListenerEventsEnum.ROOM_LEFT, ({ roomId }) => {
      console.log(`📢 Left room: ${roomId}`);
    });

    socket.on(SocketListenerEventsEnum.CONNECTED_TO_SOCKET, () => {
      console.log('✅ Connected to socket');
      set({ isConnected: true, isConnecting: false, error: null });
    });

    socket.on(SocketListenerEventsEnum.CONNECTION_ERROR, (error) => {
      console.error('❌ Socket connection error:', error);
      set({ error: error.message });
      toast.error(error.message);
    });

    socket.on(SocketListenerEventsEnum.WAITING_FOR_PLAYERS, () => {
      console.log('⏳ Waiting for players...');
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({
        isConnected: false,
        socket: null,
        error: null,
        isConnecting: false,
      });
      console.log('🔌 Socket Disconnected');
    }
  },

  leaveRoom: () => {
    const { socket } = get();
    if (socket) {
      socket.emit(SocketEmitterEventsEnum.LEAVE_ROOM);
      console.log(`📢 Attempting to leave room`);
    } else {
      console.error('❌ Socket not connected');
    }
  },

  getTotalActiveUsersForRoom: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit(SocketEmitterEventsEnum.GET_TOTAL_ACTIVE_USERS_FOR_ROOM, {
        roomId,
      });
    }
  },

  getRoomList: async () => {
    try {
      const response = await axios.get('http://localhost:3100/rooms');
      set({ roomList: response.data?.data || [] });
    } catch (error) {
      console.error('Error fetching room list:', error);
    }
  },
}));
