import React from 'react';
import GameCell from './GameCell';

const GameBoard = ({ board, onCellClick, currentPlayerId, playerId, gameStatus }) => {
  const isMyTurn = currentPlayerId === playerId;
  const isGameFinished = gameStatus === 'FINISHED';
  
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              disabled={!isMyTurn || cell !== '' || isGameFinished}
              highlight={isMyTurn && cell === ''}
            />
          ))
        )}
      </div>
      {!isMyTurn && !isGameFinished && (
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default GameBoard;