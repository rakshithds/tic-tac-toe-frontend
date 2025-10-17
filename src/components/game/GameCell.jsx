
const GameCell = ({ value, onClick, disabled }) => {
  const getCellStyle = () => {
    if (value === 'X') return 'bg-blue-100 text-blue-600';
    if (value === 'O') return 'bg-red-100 text-red-600';
    return 'bg-gray-100 hover:bg-gray-200';
  };

  const cursorStyle = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-20 h-20 flex items-center justify-center text-3xl font-bold border border-gray-300 rounded-lg ${getCellStyle()} ${cursorStyle}`}
    >
      {value}
    </button>
  );
};

export default GameCell;
