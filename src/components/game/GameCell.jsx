const GameCell = ({ value, onClick, disabled }) => {
  const getCellStyle = () => {
    if (value === "X") return "bg-blue-100 text-blue-600 border-blue-300";
    if (value === "O") return "bg-red-100 text-red-600 border-red-300";
    return "bg-gray-50 hover:bg-gray-100 border-gray-300";
  };

  const cursorStyle = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:shadow-md";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-20 h-20 flex items-center justify-center text-4xl font-bold border-2 rounded-lg transition-all ${getCellStyle()} ${cursorStyle}`}
    >
      {value}
    </button>
  );
};

export default GameCell;
