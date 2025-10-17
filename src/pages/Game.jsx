import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Message from '../components/common/Message';
import GameBoard from '../components/game/GameBoard';
import GameStatus from '../components/game/GameStatus';
import { usePlayer } from '../context/PlayerContext';
import { useGame } from '../hooks/useGame';
import { useWebSocket } from '../hooks/useWebSocket';
import { ROUTES } from '../utils/constants';

const Game = () => {
  const { playerId } = usePlayer();
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state?.gameId;
  
  const { gameState, isConnected } = useWebSocket(gameId, playerId);
  const { makeMove } = useGame();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!gameId || !playerId) {
      navigate(ROUTES.MENU);
    }
  }, [gameId, playerId, navigate]);

  useEffect(() => {
    if (gameState?.status === 'FINISHED') {
      const winner = gameState.winnerId;
      if (winner === playerId) {
        setMessage('🎉 You won!');
      } else if (winner === 'DRAW') {
        setMessage('Game ended in a draw!');
      } else {
        setMessage('You lost. Better luck next time!');
      }
    }
  }, [gameState, playerId]);

  const handleCellClick = async (row, col) => {
    if (!gameState || gameState.currentPlayerId !== playerId) {
      setMessage("It's not your turn!");
      return;
    }
    
    if (gameState.board[row][col] !== '') {
      setMessage('This cell is already taken!');
      return;
    }
    
    try {
      await makeMove(gameId, playerId, row, col);
      setMessage(''); // Clear any error messages
    } catch (error) {
      setMessage('Error making move');
    }
  };

  const handleLeave = () => {
    navigate(ROUTES.MENU);
  };

  const getPlayerSymbol = () => {
    if (!gameState) return '';
    return gameState.playerXId === playerId ? 'X' : 'O';
  };

  const isMyTurn = () => {
    return gameState && gameState.currentPlayerId === playerId;
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <p className="text-center text-gray-600">
            {isConnected ? 'Loading game...' : 'Connecting...'}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleLeave}
            variant="secondary"
            icon={ArrowLeft}
          >
            Leave
          </Button>
          
          <GameStatus 
            playerSymbol={getPlayerSymbol()} 
            isMyTurn={isMyTurn()} 
          />
          
          <div className="w-20"></div>
        </div>
        
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          currentPlayerId={gameState.currentPlayerId}
          playerId={playerId}
          gameStatus={gameState.status}
        />
        
        <Message message={message} type="info" />
      </Card>
    </div>
  );
};

export default Game;