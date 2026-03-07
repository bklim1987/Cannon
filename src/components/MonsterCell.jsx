import { MONSTER_TYPES } from '../utils/constants.js';

function getFontSize(value) {
  const digits = String(value).length;
  if (digits <= 2) return '17px';
  if (digits === 3) return '13px';
  if (digits === 4) return '11px';
  return '9px';
}

export default function MonsterCell({ monster }) {
  if (!monster) return null;

  const config = MONSTER_TYPES[monster.type];
  const isFlashing = monster.hitFlash > 0;
  const isDying = monster.dying;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDying ? '#fbbf24' : isFlashing ? '#fbbf24' : config.color.bg,
      border: `2px solid ${isDying ? '#fbbf24' : config.color.border}`,
      borderRadius: '6px',
      boxShadow: isDying
        ? '0 0 20px rgba(251,191,36,0.8)'
        : monster.type === 'boss' ? `0 0 12px ${config.color.border}` : 'none',
      position: 'relative',
      animation: isDying ? 'killFlash 400ms ease-out forwards' : 'none',
      transition: isDying ? 'none' : 'background-color 0.1s',
    }}>
      {config.label && !isDying && (
        <div style={{
          fontSize: '8px',
          fontWeight: 'bold',
          color: config.color.text,
          lineHeight: 1,
          marginBottom: '1px',
        }}>
          {config.label}
        </div>
      )}
      <div style={{
        fontSize: getFontSize(monster.value),
        fontWeight: 'bold',
        color: isDying ? '#000' : isFlashing ? '#000' : config.color.text,
        lineHeight: 1.1,
      }}>
        {isDying ? '' : monster.value}
      </div>
    </div>
  );
}
