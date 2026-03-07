import { useRef } from 'react';
import { PRIMES, COLS, COLORS, COMBO_THRESHOLD, LOCK_DURATION } from '../utils/constants.js';
import GameGrid from './GameGrid.jsx';
import PrimeButton from './PrimeButton.jsx';

export default function PlayerSide({ player, name, side, playerColor, onMove, onShoot }) {
  if (!player) return null;

  const lockRemaining = player.locked
    ? Math.max(0, (LOCK_DURATION - player.lockAcc) / 1000).toFixed(1)
    : 0;

  const comboActive = player.mult > 1;
  const prevComboRef = useRef(0);
  const comboJustActivated = comboActive && prevComboRef.current < COMBO_THRESHOLD;
  if (player.combo !== prevComboRef.current) {
    prevComboRef.current = player.combo;
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '4px',
      paddingBottom: '32px',
      position: 'relative',
      backgroundColor: player.missFlash > 0 ? 'rgba(239,68,68,0.2)' : 'transparent',
      transition: 'background-color 0.15s',
    }}>
      {comboJustActivated && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(180deg, rgba(251,191,36,0.6) 0%, transparent 100%)',
          animation: 'comboActivate 200ms ease-out forwards',
          pointerEvents: 'none',
          zIndex: 5,
        }} />
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
        minHeight: '5%',
        color: playerColor,
        fontSize: '14px',
        fontWeight: 'bold',
      }}>
        <span>{name}</span>
        <span style={{
          fontSize: '18px',
          color: comboActive ? '#fbbf24' : playerColor,
          textShadow: comboActive ? '0 0 12px rgba(251,191,36,0.8)' : 'none',
          transition: 'color 0.2s, text-shadow 0.2s',
        }}>
          {player.score}
        </span>
        <span style={{ fontSize: '12px' }}>
          {comboActive ? (
            <span style={{ color: '#fbbf24', animation: 'pulse 0.5s infinite' }}>
              x1.5 COMBO!
            </span>
          ) : (
            <span
              key={player.combo}
              style={{
                display: 'inline-block',
                animation: player.combo > 0 ? 'bump 150ms ease-out' : 'none',
              }}
            >
              🔥 {player.combo}/{COMBO_THRESHOLD}
            </span>
          )}
        </span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>
          击杀: {player.kills}
        </span>
      </div>

      <GameGrid
        monsters={player.monsters}
        cannon={player.cannon}
        locked={player.locked}
        playerColor={playerColor}
        onColumnClick={(col) => onMove(side, col)}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        height: '3%',
        alignItems: 'center',
      }}>
        {Array.from({ length: COLS }).map((_, c) => (
          <div key={c} style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '14px',
            color: c === player.cannon ? playerColor : 'transparent',
          }}>
            ▲
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '4px 0',
        paddingLeft: '20px',
        paddingRight: '20px',
        height: '12%',
        minHeight: '48px',
      }}>
        {PRIMES.map(p => (
          <PrimeButton
            key={p}
            prime={p}
            disabled={player.locked}
            playerColor={playerColor}
            onFire={(prime) => onShoot(side, prime)}
          />
        ))}
      </div>

      {player.locked && (
        <div style={{
          textAlign: 'center',
          color: '#ef4444',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '2px 0',
        }}>
          🔒 {lockRemaining}s
        </div>
      )}
    </div>
  );
}
