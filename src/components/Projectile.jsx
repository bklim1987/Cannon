import { useState, useEffect } from 'react';

export default function Projectile({ proj, onDone }) {
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setArrived(true));
    const timer = setTimeout(() => onDone(proj.id), 220);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const bg = proj.hit ? '#fbbf24' : '#ef4444';
  const color = proj.hit ? '#000' : '#fff';

  return (
    <div style={{
      position: 'absolute',
      left: proj.startX - 14,
      top: arrived ? proj.endY - 14 : proj.startY - 14,
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor: bg,
      color: color,
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'top 200ms ease-out',
      boxShadow: proj.hit
        ? '0 4px 12px rgba(251,191,36,0.6)'
        : '0 4px 12px rgba(239,68,68,0.5)',
      zIndex: 20,
      pointerEvents: 'none',
      opacity: arrived ? 0.8 : 1,
    }}>
      {proj.prime}
    </div>
  );
}
