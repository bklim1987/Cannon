export default function PrimeButton({ prime, disabled, playerColor, onFire }) {
  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        if (!disabled) onFire(prime);
      }}
      disabled={disabled}
      style={{
        flex: 1,
        height: '100%',
        minHeight: '48px',
        fontSize: '17px',
        fontWeight: 'bold',
        border: `2px solid ${disabled ? '#555' : playerColor}`,
        borderRadius: '8px',
        backgroundColor: disabled ? '#333' : '#1a2234',
        color: disabled ? '#666' : playerColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transition: 'background-color 0.1s, border-color 0.1s',
      }}
    >
      {prime}
    </button>
  );
}
