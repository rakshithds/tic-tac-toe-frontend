
const Message = ({ message, type = 'info' }) => {
  if (!message) return null;

  const styles = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    error: 'text-red-800',
    warning: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <p
      className={`mt-1 text-xs text-left ${styles[type] || styles.info}`}
    >
      {message}
    </p>
  );
};

export default Message;
