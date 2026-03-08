export default function Timer({ timeLeft }) {
  const seconds = Math.ceil(timeLeft / 1000);
  const isUrgent = seconds <= 10;

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.35)',
      padding: '2px 14px',
      borderRadius: '6px',
      fontSize: '15px',
      fontWeight: 'bold',
      color: isUrgent ? '#ef4444' : 'rgba(229,231,235,0.75)',
      fontVariantNumeric: 'tabular-nums',
    }}>
      {seconds}s
    </div>
  );
}
