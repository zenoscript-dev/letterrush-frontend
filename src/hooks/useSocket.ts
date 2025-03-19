import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('ws://localhost:4100/game', {
      transports: ['websocket'], // Ensures WebSocket connection
      reconnectionAttempts: 5, // Limit reconnection attempts
      reconnectionDelay: 2000, // Time between attempts,
      query: {
        userId: uuidv4(), // Add userId as query parameter
      },
    });
    setIsConnecting(true);
    setError(null);

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnecting(false);
      setIsConnected(true);
      setError(null);
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      setIsConnecting(false);
      setIsConnected(false);
      setError('Disconnected from the server');
      console.log('Disconnected from the server');
    });

    socket.on('reconnected', () => {
      setIsConnected(true);
      setError(null);
      console.log('Reconnected to the server');
    });

    socket.on('reconnect-failed', (error) => {
      //   setIsConnected(false);
      //   setError("Reconnection error");
      console.log('Reconnection error', error);
    });

    socket.on('error', (error) => {
      setIsConnected(false);
      setError(error.message);
      console.log('Socket error', error);
    });

    socket.on('room-joined', (data) => {
      console.log('Room joined', data);
    });
    socket.on('starting-game', (data) => {
      console.log('Starting game', data);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  function joinRoom(roomId: string) {
    alert('joining room');
    try {
      if (!socketRef.current) {
        throw new Error('Socket not connected');
      }

      socketRef.current.emit('join-room', {
        userId: 'user123',
        gameId: roomId,
      });
    } catch (error: any) {
      setError(error.message);
      console.error('Error joining room', error);
    }
  }

  return {
    socket: socketRef.current,
    isConnected,
    isConnecting,
    error,
    joinRoom,
  };
};
