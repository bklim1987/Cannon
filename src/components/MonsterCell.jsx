import { MONSTER_TYPES } from '../utils/constants.js';

function getFontSize(value) {
  const digits = String(value).length;
  if (digits <= 2) return '17px';
  if (digits === 3) return '13px';
  if (digits === 4) return '11px';
  return '9px';
}

function SmallMonster({ monster, config, isFlashing, isDying }) {
  return (
    <div style={{
      width: '85%',
      height: '85%',
      borderRadius: '50%',
      backgroundColor: isDying ? '#fbbf24' : isFlashing ? '#fbbf24' : config.color.bg,
      border: `2px solid ${isDying ? '#fbbf24' : config.color.border}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      animation: isDying ? 'killFlash 400ms ease-out forwards' : 'none',
      transition: isDying ? 'none' : 'background-color 0.1s',
    }}>
      <div style={{
        position: 'absolute',
        top: '-6px',
        left: '25%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: config.color.border,
      }} />
      <div style={{
        position: 'absolute',
        top: '-6px',
        right: '25%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: config.color.border,
      }} />

      {!isDying && (
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '1px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#fff' }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#fff' }} />
        </div>
      )}

      <div style={{
        fontSize: getFontSize(monster.value),
        fontWeight: 'bold',
        color: isDying ? '#000' : isFlashing ? '#000' : config.color.text,
        lineHeight: 1,
      }}>
        {isDying ? '' : monster.value}
      </div>
    </div>
  );
}

function BigMonster({ monster, config, isFlashing, isDying }) {
  return (
    <div style={{
      width: '90%',
      height: '90%',
      borderRadius: '6px',
      backgroundColor: isDying ? '#fbbf24' : isFlashing ? '#fbbf24' : config.color.bg,
      border: `2px solid ${isDying ? '#fbbf24' : config.color.border}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      animation: isDying ? 'killFlash 400ms ease-out forwards' : 'none',
      transition: isDying ? 'none' : 'background-color 0.1s',
    }}>
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '20%',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: `8px solid ${config.color.border}`,
      }} />
      <div style={{
        position: 'absolute',
        top: '-8px',
        right: '20%',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: `8px solid ${config.color.border}`,
      }} />

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

function BossMonster({ monster, config, isFlashing, isDying }) {
  return (
    <div style={{
      width: '95%',
      height: '95%',
      borderRadius: '6px',
      backgroundColor: isDying ? '#fbbf24' : isFlashing ? '#fbbf24' : config.color.bg,
      border: `2px solid ${isDying ? '#fbbf24' : config.color.border}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      animation: isDying
        ? 'killFlash 400ms ease-out forwards'
        : 'bossPulse 1.5s ease-in-out infinite',
      transition: isDying ? 'none' : 'background-color 0.1s',
    }}>
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '15%',
        width: 0,
        height: 0,
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: `10px solid ${config.color.border}`,
      }} />
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: `12px solid ${config.color.border}`,
      }} />
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '15%',
        width: 0,
        height: 0,
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: `10px solid ${config.color.border}`,
      }} />

      {!isDying && (
        <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '1px',
        }}>
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#fca5a5',
            boxShadow: '0 0 4px rgba(239,68,68,0.8)',
          }} />
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#fca5a5',
            boxShadow: '0 0 4px rgba(239,68,68,0.8)',
          }} />
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

      {!isDying && (
        <div style={{
          fontSize: '7px',
          fontWeight: 'bold',
          color: config.color.text,
          lineHeight: 1,
          marginTop: '1px',
          letterSpacing: '1px',
        }}>
          BOSS
        </div>
      )}
    </div>
  );
}

export default function MonsterCell({ monster }) {
  if (!monster) return null;

  const config = MONSTER_TYPES[monster.type];
  const isFlashing = monster.hitFlash > 0;
  const isDying = monster.dying;

  const props = { monster, config, isFlashing, isDying };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {monster.type === 'small' && <SmallMonster {...props} />}
      {monster.type === 'big' && <BigMonster {...props} />}
      {monster.type === 'boss' && <BossMonster {...props} />}
    </div>
  );
}
