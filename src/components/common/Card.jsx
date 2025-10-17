const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-purple-300 rounded-2xl shadow-2xl p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
