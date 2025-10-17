import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid3x3 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import ApiService from "../services/api";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Message from "../components/common/Message";
import { ROUTES } from "../utils/constants";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const { registerPlayer } = usePlayer();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length > 15) {
      setMessage("Player name cannot exceed 15 characters");
      setType("error");
    } else {
      setMessage("");
      setType("");
    }

    setPlayerName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setMessage("Please enter your name");
      setType("error");
      return;
    }

    if (playerName.length > 15) {
      setMessage("Player name cannot exceed 15 characters");
      setType("error");
      return;
    }

    setMessage("");
    setType("success");

    setLoading(true);

    try {
      const data = await ApiService.registerPlayer(playerName);
      registerPlayer(data.id, data.name);
      navigate(ROUTES.MENU);
    } catch (error) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="bg-purple-100 hover:bg-purple-200 h-56">
        <div className="text-center mb-8 mr-5">
          <Grid3x3 className="w-10 h-10 mx-auto text-purple-500 mb-4" />
          <h1 className="text-2 font-bold text-gray-800 mb-2">Tic-Tac-Toe</h1>
          <p className="text-gray-600">Multiplayer Edition</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={playerName}
              onChange={handleChange}
              placeholder="Your name"
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200
              ${
                message && type === "error"
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-purple-500"
              }`}
            />
            <Message message={message} type={type} />
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Connecting..." : "Start Playing"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Home;
