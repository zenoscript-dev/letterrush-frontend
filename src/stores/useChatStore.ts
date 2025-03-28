import { create } from 'zustand';

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
  SCORE = 'score',
  GAME_STARTED = 'start-game',
}

export interface Message {
  id: string;
  message: string;
  roomId: string;
  nickName: string;
  type: MessageType;
}

interface ChatState {
  loading: boolean;
  error: string | null;
  messages: Message[];
}

export const useChatStore = create<ChatState>(() => ({
  loading: false,
  error: null,
  messages: [],
}));
