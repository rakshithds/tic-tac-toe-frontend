import { useState } from "react";
import ApiService from "../services/api";

export const useGame = () => {
  const [gameId, setGameId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findMatch = async (playerId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await ApiService.findMatch(playerId);
      setGameId(data.gameId);
      return data;
    } catch (err) {
      setError("Failed to find match");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeMove = async (gameId, playerId, row, col) => {
    debugger;
    if (!gameId) {
      console.error("No gameId available");
      return;
    }

    try {
      await ApiService.makeMove(gameId, playerId, row, col);
    } catch (err) {
      setError("Failed to make move");
      throw err;
    }
  };

  return { gameId, findMatch, makeMove, loading, error };
};
