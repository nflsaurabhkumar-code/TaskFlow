// Message shown at the top (success or error). Click it to close.
export default function Notice({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="notice" onClick={onClose}>
      {message} <span>×</span>
    </div>
  );
}
