'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ConnectionStatus,
  StreamEvent,
} from '../components/StreamViewer/types';

const MAX_EVENTS = 100;

const createStreamSocket = (url: string) => new WebSocket(url);

export const useStreamSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  const [status, setStatus] =
    useState<ConnectionStatus>('connecting');

  const [events, setEvents] = useState<StreamEvent[]>([]);

  useEffect(() => {
    const socket = createStreamSocket(url);

    socketRef.current = socket;

    setStatus('connecting');

    socket.onopen = () => {
      setStatus('connected');
    };

    socket.onmessage = (event) => {
      try {
        const parsedEvent: StreamEvent = JSON.parse(event.data);

        setEvents((prev) => {
          const updated = [parsedEvent, ...prev];

          return updated.slice(0, MAX_EVENTS);
        });
      } catch (error) {
        console.error('Invalid socket payload:', error);
      }
    };

    socket.onerror = () => {
      setStatus('error');
    };

    socket.onclose = () => {
      setStatus('disconnected');
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return {
    status,
    events,
  };
};