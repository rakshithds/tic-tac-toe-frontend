
const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`border border-purple-300 rounded-2xl shadow-md p-4 flex items-center justify-center text-center text-2xl font-bold ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
