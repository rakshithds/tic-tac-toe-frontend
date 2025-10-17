
const GameStatus = ({ playerSymbol, isMyTurn }) => {
  const turnStyle = isMyTurn ? "text-green-600" : "text-gray-600";
  const symbolColor = playerSymbol === 'X' ? 'text-blue-600' : 'text-red-600';
  
  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg text-center">
      <p className="text-lg font-medium">
        You are: <span className={`font-bold ${symbolColor}`}>{playerSymbol}</span>
      </p>
      <p className={`mt-2 text-sm font-medium ${turnStyle}`}>
        {isMyTurn ? "🎮 Your turn!" : "⌛ Waiting for opponent..."}
      </p>
    </div>
  );
};

export default GameStatus;
