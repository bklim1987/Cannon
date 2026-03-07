import { useEffect, useRef } from 'react';
import { COLORS } from '../utils/constants.js';
import { playVictory } from '../utils/sounds.js';

export default function Results({ playerA, playerB, nameA, nameB, isTournament, onRestart }) {
  const winner = playerA.score > playerB.score ? 'A'
    : playerB.score > playerA.score ? 'B'
    : 'draw';

  const played = useRef(false);
  useEffect(() => {
    if (!played.current) {
      played.current = true;
      playVictory();
    }
  }, []);

  const cards = [
    { side: 'A', name: nameA, player: playerA, color: COLORS.playerA },
    { side: 'B', name: nameB, player: playerB, color: COLORS.playerB },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.bg,
      color: '#e5e7eb',
      gap: '20px',
      padding: '20px',
    }}>
      <h1 style={{ fontSize: '36px', color: '#fbbf24' }}>⏱ 时间到！</h1>

      {winner !== 'draw' && (
        <h2 style={{ fontSize: '24px', color: '#fbbf24' }}>
          🏆 {winner === 'A' ? nameA : nameB} 胜利！
        </h2>
      )}
      {winner === 'draw' && (
        <h2 style={{ fontSize: '24px', color: '#9ca3af' }}>平局！</h2>
      )}

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.map(({ side, name, player, color }) => {
          const isWinner = winner === side;
          return (
            <div key={side} style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#1a2234',
              border: `3px solid ${color}`,
              color: color,
              minWidth: '200px',
              textAlign: 'center',
              animation: isWinner ? 'winnerPulse 1.5s ease-in-out infinite' : 'none',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '8px' }}>
                {name}
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
                {player.score}
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.8 }}>
                <div>击杀: {player.kills}</div>
                <div>最高连击: {player.maxCombo}</div>
                <div>漏掉: {player.missed}</div>
                <div>射错: {player.locks}</div>
              </div>
            </div>
          );
        })}
      </div>

      {!isTournament && (
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onRestart();
          }}
          style={{
            padding: '16px 48px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#fbbf24',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            minHeight: '56px',
            marginTop: '8px',
          }}
        >
          再来一局
        </button>
      )}
    </div>
  );
}
