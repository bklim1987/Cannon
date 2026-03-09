import { useState, useEffect, useRef } from 'react';
import { COLORS } from '../utils/constants.js';
import { playVictory } from '../utils/sounds.js';
import { saveScore } from '../utils/scores.js';

const inputStyle = {
  padding: '6px 10px',
  fontSize: '14px',
  backgroundColor: '#263040',
  color: '#e5e7eb',
  border: '1px solid #374151',
  borderRadius: '6px',
  textAlign: 'center',
  width: '140px',
  outline: 'none',
};

const STAT_LABELS = ['击杀', '最高连击', '漏掉', '射错'];
const STAT_KEYS = ['kills', 'maxCombo', 'missed', 'locks'];

function StatLine({ label, value, visible }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
      <span>{label}:</span>
      <span style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in',
        fontWeight: 'bold',
        color: '#e5e7eb',
      }}>
        {value}
      </span>
    </div>
  );
}

export default function Results({ playerA, playerB, nameA, nameB, isTournament, onRestart, onBack, onLeaderboard }) {
  const winner = playerA.score > playerB.score ? 'A'
    : playerB.score > playerA.score ? 'B'
    : 'draw';

  const [editNameA, setEditNameA] = useState(nameA);
  const [editNameB, setEditNameB] = useState(nameB);
  const [saved, setSaved] = useState(false);
  const [revealStep, setRevealStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const played = useRef(false);
  useEffect(() => {
    if (!played.current) {
      played.current = true;
      playVictory();
    }
  }, []);

  useEffect(() => {
    if (revealStep < STAT_LABELS.length) {
      const timer = setTimeout(() => setRevealStep(s => s + 1), 500);
      return () => clearTimeout(timer);
    }
    const btnTimer = setTimeout(() => setShowButtons(true), 500);
    return () => clearTimeout(btnTimer);
  }, [revealStep]);

  const handleSave = () => {
    const resultA = winner === 'A' ? 'win' : winner === 'B' ? 'lose' : 'draw';
    const resultB = winner === 'B' ? 'win' : winner === 'A' ? 'lose' : 'draw';
    const finalNameA = editNameA.trim() || nameA;
    const finalNameB = editNameB.trim() || nameB;
    saveScore({
      mode: 'duo', name: finalNameA, score: playerA.score,
      kills: playerA.kills, maxCombo: playerA.maxCombo,
      missed: playerA.missed, locks: playerA.locks, result: resultA,
    });
    saveScore({
      mode: 'duo', name: finalNameB, score: playerB.score,
      kills: playerB.kills, maxCombo: playerB.maxCombo,
      missed: playerB.missed, locks: playerB.locks, result: resultB,
    });
    setSaved(true);
  };

  const cards = [
    { side: 'A', name: editNameA, setName: setEditNameA, player: playerA, color: COLORS.playerA },
    { side: 'B', name: editNameB, setName: setEditNameB, player: playerB, color: COLORS.playerB },
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
      position: 'relative',
    }}>
      <h1 style={{ fontSize: '36px', color: '#fbbf24' }}>⏱ 时间到！</h1>

      {winner !== 'draw' && (
        <h2 style={{ fontSize: '24px', color: '#fbbf24' }}>
          🏆 {winner === 'A' ? editNameA : editNameB} 胜利！
        </h2>
      )}
      {winner === 'draw' && (
        <h2 style={{ fontSize: '24px', color: '#9ca3af' }}>平局！</h2>
      )}

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.map(({ side, name, setName, player, color }) => {
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
              {!isTournament && !saved ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入名字"
                  style={{ ...inputStyle, marginBottom: '8px', color }}
                />
              ) : (
                <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '8px' }}>
                  {name}
                </div>
              )}
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
                {player.score}
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.8 }}>
                {STAT_LABELS.map((label, i) => (
                  <StatLine key={label} label={label} value={player[STAT_KEYS[i]]} visible={i < revealStep} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showButtons && !isTournament && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.4s ease-in',
        }}>
          {!saved ? (
            <button
              onPointerDown={(e) => { e.preventDefault(); handleSave(); }}
              style={{
                padding: '12px 36px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                minHeight: '50px',
              }}
            >
              保存成绩
            </button>
          ) : (
            <div style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>成绩已保存</div>
          )}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onPointerDown={(e) => { e.preventDefault(); onRestart(); }}
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
              }}
            >
              再来一局
            </button>
            {onBack && (
              <button
                onPointerDown={(e) => { e.preventDefault(); onBack(); }}
                style={{
                  padding: '16px 48px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  border: '2px solid #374151',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  minHeight: '56px',
                }}
              >
                返回主页
              </button>
            )}
          </div>
          {onLeaderboard && (
            <button
              onPointerDown={(e) => { e.preventDefault(); onLeaderboard(); }}
              style={{
                padding: '10px 32px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: '2px solid #374151',
                borderRadius: '10px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                minHeight: '44px',
              }}
            >
              查看排行榜
            </button>
          )}
        </div>
      )}
    </div>
  );
}
