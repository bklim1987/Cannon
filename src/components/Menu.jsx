import { MONSTER_TYPES, COLORS } from '../utils/constants.js';

const monsterPreviews = [
  { type: 'small', name: '小怪', desc: '2个质因数，100分' },
  { type: 'big', name: '大怪', desc: '3个质因数，200分' },
  { type: 'boss', name: 'BOSS', desc: '5个质因数，500分' },
];

export default function Menu({ onStart }) {
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
      padding: '20px',
      gap: '24px',
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#fbbf24' }}>
        数字大炮
      </h1>
      <p style={{ fontSize: '16px', color: '#9ca3af' }}>Number Cannon</p>

      <div style={{
        maxWidth: '500px',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: 1.8,
        color: '#d1d5db',
      }}>
        <p>🎯 点击列移动大炮</p>
        <p>🔢 按质数按钮射击怪物</p>
        <p>❌ 射错锁定1秒</p>
        <p>🔥 连续命中10次 → 1.5x 得分!</p>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {monsterPreviews.map(mp => {
          const config = MONSTER_TYPES[mp.type];
          return (
            <div key={mp.type} style={{
              padding: '12px 20px',
              borderRadius: '8px',
              backgroundColor: config.color.bg,
              border: `2px solid ${config.color.border}`,
              textAlign: 'center',
              minWidth: '120px',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: config.color.text }}>
                {mp.name}
              </div>
              <div style={{ fontSize: '12px', color: config.color.text, marginTop: '4px' }}>
                {mp.desc}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onPointerDown={(e) => {
          e.preventDefault();
          onStart();
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
        }}
      >
        开始对战
      </button>
    </div>
  );
}
