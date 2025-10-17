import { createContext, useContext, useEffect, useState } from "react";

const playerContext = createContext();

export const usePlayer = () => {
  const context = useContext(playerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const storedPlayerId = sessionStorage.getItem("playerId");
    const storedPlayerName = sessionStorage.getItem("playerName");
    if (storedPlayerId && storedPlayerName) {
      setPlayerId(storedPlayerId);
      setPlayerName(storedPlayerName);
    }
  }, []);

  const registerPlayer = (id, name) => {
    setPlayerId(id);
    setPlayerName(name);
    sessionStorage.setItem("playerId", id);
    sessionStorage.setItem("playerName", name);
  };

  const clearPlayer = () => {
    setPlayerId(null);
    setPlayerName("");
    sessionStorage.removeItem("playerId");
    sessionStorage.removeItem("playerName");
  };

  return (
    <playerContext.Provider
      value={{
        playerId,
        playerName,
        registerPlayer,
        clearPlayer,
      }}
    >
      {children}
    </playerContext.Provider>
  );
};
