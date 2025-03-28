import axios from 'axios';
import { create } from 'zustand';

export interface Room {
  roomId: string;
  roomName: string;
  roomSize: number;
}

interface RoomState {
  loading: boolean;
  error: string | null;
  rooms: Room[] | null;
  getRooms: () => Promise<void>;
}

const useRoomStore = create<RoomState>((set) => ({
  loading: false,
  error: null,
  rooms: null,
  getRooms: async () => {
    // set({ rooms });
    set({ loading: true });
    try {
      set({ loading: true });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      if (response.status === 200) {
        if (response.data) {
          set({ rooms: response.data.data });
          set({ loading: false });
        } else {
          set({ error: 'No rooms found' });
          set({ loading: false });
        }
      } else {
        set({ error: 'Failed to fetch rooms' });
        set({ loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch rooms' });
      set({ loading: false });
    }
  },
}));

export default useRoomStore;
