const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
    secondary: "bg-blue-400 hover:bg-blue-500 text-white",
  };

  const disabledStyles =
    "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${widthStyles} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
