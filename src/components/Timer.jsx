export default function Timer({ timeLeft, duration = 60000 }) {
  const seconds = Math.ceil(timeLeft / 1000);
  const isUrgent = seconds <= 10;
  const progress = Math.max(0, Math.min(1, timeLeft / duration));

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.35)',
      padding: '2px 14px 4px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3px',
    }}>
      <span style={{
        fontSize: '15px',
        fontWeight: 'bold',
        color: isUrgent ? '#ef4444' : 'rgba(229,231,235,0.75)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {seconds}s
      </span>
      <div style={{
        width: '48px',
        height: '3px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: isUrgent ? '#ef4444' : 'rgba(229,231,235,0.5)',
          borderRadius: '2px',
          transition: 'width 0.3s linear',
        }} />
      </div>
    </div>
  );
}
