import { io, Socket } from 'socket.io-client';
class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {} // Prevent direct instantiation

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  async connect(roomId: string, nickname: string): Promise<Socket> {
    if (!this.socket) {
      this.socket = await io(`${import.meta.env.VITE_SOCKET_URL}/game`, {
        query: { roomId, nickname },
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
        this.socket = null;
      });
    }
    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export default SocketService;
