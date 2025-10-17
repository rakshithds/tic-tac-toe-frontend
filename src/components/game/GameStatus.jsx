
const GameStatus = ({ playerSymbol, isMyTurn, gameStatus }) => {
  return (
    <div className="w-40 h-20 p-4 mb-4 bg-yellow-300 rounded-lg text-center">
      <p className="text-lg font-medium">You are: <span className="font-bold">{playerSymbol}</span></p>
      <p className="mt-2 text-sm text-gray-700">
        {(gameStatus === "FINISHED") ? "Game Over" : (isMyTurn ? "Your turn" : "Opponent's turn")}
      </p>
    </div>
  );
};

export default GameStatus;
