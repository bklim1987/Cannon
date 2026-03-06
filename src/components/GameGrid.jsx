import { COLS, ROWS, COLORS } from '../utils/constants.js';
import MonsterCell from './MonsterCell.jsx';

export default function GameGrid({ monsters, cannon, locked, playerColor, onColumnClick }) {
  const monsterMap = {};
  for (const m of monsters) {
    const key = `${m.col}-${m.row}`;
    if (!monsterMap[key] || m.row > monsterMap[key].row) {
      monsterMap[key] = m;
    }
  }

  const rows = [];
  for (let r = 0; r < ROWS; r++) {
    const cells = [];
    for (let c = 0; c < COLS; c++) {
      const key = `${c}-${r}`;
      const monster = monsterMap[key];
      const isCannonCol = c === cannon;

      cells.push(
        <div
          key={key}
          onPointerDown={(e) => {
            e.preventDefault();
            if (!locked) onColumnClick(c);
          }}
          style={{
            flex: 1,
            aspectRatio: 'auto',
            backgroundColor: isCannonCol
              ? (playerColor === COLORS.playerA ? 'rgba(56,189,248,0.12)' : 'rgba(244,114,182,0.12)')
              : COLORS.cellBg,
            border: `1px solid ${COLORS.cellBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'manipulation',
            cursor: locked ? 'not-allowed' : 'pointer',
            padding: '1px',
          }}
        >
          {monster && <MonsterCell monster={monster} />}
        </div>
      );
    }
    rows.push(
      <div key={r} style={{ display: 'flex', flex: 1 }}>
        {cells}
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.gridBg,
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      {rows}
    </div>
  );
}
