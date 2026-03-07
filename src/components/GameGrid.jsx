import { useRef, useState, useEffect, forwardRef } from 'react';
import { COLS, ROWS, COLORS } from '../utils/constants.js';
import MonsterCell from './MonsterCell.jsx';
import Projectile from './Projectile.jsx';

const GameGrid = forwardRef(function GameGrid({ monsters, cannon, locked, playerColor, onColumnClick, projectiles, onProjectileDone }, ref) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    }
    measure();
    const obs = new ResizeObserver(measure);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const cellW = dims.w / COLS;
  const cellH = dims.h / ROWS;

  const rows = [];
  for (let r = 0; r < ROWS; r++) {
    const cells = [];
    for (let c = 0; c < COLS; c++) {
      const isCannonCol = c === cannon;
      cells.push(
        <div
          key={`${c}-${r}`}
          onPointerDown={(e) => {
            e.preventDefault();
            if (!locked) onColumnClick(c);
          }}
          style={{
            flex: 1,
            backgroundColor: isCannonCol
              ? (playerColor === COLORS.playerA ? 'rgba(56,189,248,0.12)' : 'rgba(244,114,182,0.12)')
              : COLORS.cellBg,
            border: `1px solid ${COLORS.cellBorder}`,
            touchAction: 'manipulation',
            cursor: locked ? 'not-allowed' : 'pointer',
          }}
        />
      );
    }
    rows.push(
      <div key={r} style={{ display: 'flex', flex: 1 }}>
        {cells}
      </div>
    );
  }

  function setRefs(el) {
    containerRef.current = el;
    if (ref) {
      if (typeof ref === 'function') ref(el);
      else ref.current = el;
    }
  }

  return (
    <div
      ref={setRefs}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.gridBg,
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {rows}

      {dims.w > 0 && monsters.map(m => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            left: m.col * cellW,
            top: m.row * cellH,
            width: cellW,
            height: cellH,
            transition: 'top 300ms ease-out',
            padding: '1px',
            pointerEvents: 'none',
            zIndex: m.dying ? 5 : 1,
          }}
        >
          <MonsterCell monster={m} />
        </div>
      ))}

      {dims.w > 0 && projectiles && projectiles.map(p => (
        <Projectile key={p.id} proj={p} onDone={onProjectileDone} />
      ))}
    </div>
  );
});

export default GameGrid;
