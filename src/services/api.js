import { API_BASE_URL } from "../utils/constants";

class ApiService {
  async registerPlayer(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/players/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
      if (!response.ok) {
        throw new Error("Failed to register player");
      }
      return await response.json();
    } catch (error) {
      console.error("Error registering player:", error);
      throw error;
    }
  }

  async findMatch(playerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/matchmaking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });
      if (!response.ok) {
        throw new Error("Failed to find match");
      }
      return await response.json();
    } catch (error) {
      console.error("Error finding match:", error);
      throw error;
    }
  }

  async makeMove(gameId, playerId, row, col) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, row, col }),
      });

      if (!response.ok) {
        throw new Error("Failed to make move");
      }

      return await response.json();
    } catch (error) {
      console.error("Error making move:", error);
      throw error;
    }
  }

  async getLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`);

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  }
}

export default new ApiService();
