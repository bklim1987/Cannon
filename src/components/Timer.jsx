export default function Timer({ timeLeft }) {
  const seconds = Math.ceil(timeLeft / 1000);
  const isUrgent = seconds <= 10;

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: '4px 24px',
      borderRadius: '8px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: isUrgent ? '#ef4444' : '#e5e7eb',
      fontVariantNumeric: 'tabular-nums',
    }}>
      {seconds}s
    </div>
  );
}
