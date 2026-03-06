import { PRIMES, COLS, COLORS, LOCK_DURATION } from '../utils/constants.js';
import GameGrid from './GameGrid.jsx';
import PrimeButton from './PrimeButton.jsx';

export default function PlayerSide({ player, name, side, playerColor, onMove, onShoot }) {
  if (!player) return null;

  const lockRemaining = player.locked
    ? Math.max(0, (LOCK_DURATION - player.lockAcc) / 1000).toFixed(1)
    : 0;

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
