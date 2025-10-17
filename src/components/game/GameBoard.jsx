import React from 'react';
import GameCell from './GameCell';

const GameBoard = ({ board, onCellClick, currentPlayerId, playerId, gameStatus }) => {
  const isMyTurn = currentPlayerId === playerId;
  const isGameFinished = gameStatus === 'FINISHED';
  
  return (
    <div className="by-white-100 grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GameCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={!isMyTurn || cell !== '' || isGameFinished}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;