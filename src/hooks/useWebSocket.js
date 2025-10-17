import { useState, useEffect, useCallback } from 'react';
import WebSocketService from '../services/websocket';

export const useWebSocket = (gameId, playerId) => {
  const [gameState, setGameState] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const handleMessage = useCallback((data) => {
    if (data.type === 'GAME_STATE') {
      setGameState(data.game);
    }
  }, []);

  const handleError = useCallback((err) => {
    setError('Connection error. Retrying...');
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (gameId && playerId) {
      WebSocketService.connect(gameId, playerId, handleMessage, handleError);
      setIsConnected(true);
      
      return () => {
        WebSocketService.disconnect();
        setIsConnected(false);
      };
    }
  }, [gameId, playerId, handleMessage, handleError]);

  return { gameState, isConnected, error };
};