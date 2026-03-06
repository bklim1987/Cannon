export default function Timer({ timeLeft }) {
  const seconds = Math.ceil(timeLeft / 1000);
  const isUrgent = seconds <= 10;

  return (
    <div style={{
      position: 'absolute',
      top: '4px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: '4px 16px',
      borderRadius: '8px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: isUrgent ? '#ef4444' : '#e5e7eb',
      zIndex: 10,
      fontVariantNumeric: 'tabular-nums',
    }}>
      {seconds}s
    </div>
  );
}
