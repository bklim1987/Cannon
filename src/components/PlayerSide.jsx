import { PRIMES, COLS, COLORS, COMBO_THRESHOLD, LOCK_DURATION } from '../utils/constants.js';
import GameGrid from './GameGrid.jsx';
import PrimeButton from './PrimeButton.jsx';

export default function PlayerSide({ player, name, side, playerColor, onMove, onShoot }) {
  if (!player) return null;

  const lockRemaining = player.locked
    ? Math.max(0, (LOCK_DURATION - player.lockAcc) / 1000).toFixed(1)
    : 0;

  const comboActive = player.mult > 1;

  const isLeft = side === 'A';

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
        <span style={{ fontSize: '18px' }}>{player.score}</span>
        <span style={{ fontSize: '12px' }}>
          {comboActive ? (
            <span style={{ color: '#fbbf24', animation: 'pulse 0.5s infinite' }}>
              x1.5 COMBO!
            </span>
          ) : (
            <span>🔥 {player.combo}/{COMBO_THRESHOLD}</span>
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
        paddingLeft: isLeft ? '4px' : '20px',
        paddingRight: isLeft ? '20px' : '4px',
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
