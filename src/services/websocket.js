import { WS_BASE_URL } from "../utils/constants";

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(gameId, playerId, onMessage, onError) {
    const wsUrl = `${WS_BASE_URL}/${gameId}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      this.send({ type: "JOIN", playerId });
    };
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (onError) onError(error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.attemptReconnect(gameId, playerId, onMessage, onError);
    };
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not open. Message not sent:", data);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      console.log("WebSocket disconnected manually");
    }
  }

  attemptReconnect(gameId, playerId, onMessage, onError) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnect attempt ${this.reconnectAttempts}`);
      setTimeout(() => {
        this.connect(gameId, playerId, onMessage, onError);
      }, 2000);
    } else {
      console.warn("Max reconnect attempts reached. Giving up.");
    }
  }
}

export default new WebSocketService();
