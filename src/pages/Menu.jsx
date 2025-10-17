import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, Trophy, LogOut } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useGame } from "../hooks/useGame";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Message from "../components/common/Message";
import { ROUTES } from "../utils/constants";

const Menu = () => {
  const {clearPlayer} = usePlayer();
  const { playerName, playerId } = usePlayer();
  const { findMatch, loading } = useGame();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFindMatch = async () => {
    setMessage("Finding match...");

    try {
      const data = await findMatch(playerId);
      if (data.status === "WAITING") {
        setMessage("Waiting for opponent...");
      }

      navigate(ROUTES.GAME, { state: { gameId: data.gameId } });
    } catch (error) {
      setMessage("Error finding match");
    }
  };

  const handleLeaderboard = () => {
    navigate(ROUTES.LEADERBOARD);
  };

  return (
    <div className="bg-purple-400 min-h-screen via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="relative">
          <LogOut
            className="w-6 h-6 text-red-500 absolute top-4 right-4 cursor-pointer hover:text-red-700"
            onClick={() => {
              clearPlayer(); 
              navigate(ROUTES.HOME); 
            }}
            title="Logout"
          />
        </div>
        <div className="text-center mb-8">
          <User className="w-16 h-16 mx-auto text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {playerName}!
          </h2>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleFindMatch}
            variant="success"
            fullWidth
            icon={Users}
            disabled={loading}
          >
            {loading ? "Finding Match..." : "Find Match"}
          </Button>

          <Button
            onClick={handleLeaderboard}
            variant="warning"
            fullWidth
            icon={Trophy}
          >
            Leaderboard
          </Button>
        </div>

        <Message message={message} type="info" />
      </Card>
    </div>
  );
};

export default Menu;
