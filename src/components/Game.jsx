import { useState, useEffect, useCallback, useRef } from 'react';
import { COLORS, DEFAULT_DURATION } from '../utils/constants.js';
import { useGameLoop } from '../hooks/useGameLoop.js';
import PlayerSide from './PlayerSide.jsx';
import Timer from './Timer.jsx';
import Results from './Results.jsx';

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const rawDuration = parseInt(params.get('duration'));
  const isTournament = params.get('mode') === 'tournament';
  return {
    nameA: params.get('teamA') || params.get('playerA') || '玩家 A',
    nameB: params.get('teamB') || params.get('playerB') || '玩家 B',
    isTournament,
    matchId: params.get('matchId') || '',
    duration: (rawDuration > 0 && Number.isFinite(rawDuration)) ? rawDuration : DEFAULT_DURATION,
  };
}

export default function Game({ onBack }) {
  const { nameA, nameB, matchId, isTournament, duration } = getUrlParams();
  const [, forceUpdate] = useState(0);
  const [endState, setEndState] = useState(null);

  const handleEnd = useCallback((state) => {
    setEndState({ playerA: { ...state.playerA }, playerB: { ...state.playerB } });

    const scoreA = state.playerA.score;
    const scoreB = state.playerB.score;
    const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'draw';

    try {
      window.parent.postMessage({
        type: 'tournamentMatchEnd',
        matchId,
        scoreA,
        scoreB,
        winner,
        extra: {
          killsA: state.playerA.kills,
          killsB: state.playerB.kills,
          maxComboA: state.playerA.maxCombo,
          maxComboB: state.playerB.maxCombo,
          missedA: state.playerA.missed,
          missedB: state.playerB.missed,
          locksA: state.playerA.locks,
          locksB: state.playerB.locks,
        },
      }, '*');
    } catch (e) {}
  }, [matchId]);

  const { getState, init, startCountdown, moveCannon, shoot } = useGameLoop(duration, handleEnd);

  const renderRef = useRef(null);

  useEffect(() => {
    init();
    startCountdown();

    renderRef.current = setInterval(() => {
      forceUpdate(n => n + 1);
    }, 50);

    return () => {
      if (renderRef.current) clearInterval(renderRef.current);
    };
  }, [init, startCountdown]);

  const state = getState();
  if (!state) return null;

  if (endState) {
    return (
      <Results
        playerA={endState.playerA}
        playerB={endState.playerB}
        nameA={nameA}
        nameB={nameB}
        isTournament={isTournament}
        onRestart={() => {
          setEndState(null);
          init();
          startCountdown();
        }}
        onBack={onBack}
      />
    );
  }

  if (state.phase === 'countdown') {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
      }}>
        <div style={{
          fontSize: '96px',
          fontWeight: 'bold',
          color: '#fbbf24',
        }}>
          {state.countdownValue}
        </div>
      </div>
    );
  }

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.bg,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <Timer timeLeft={state.timeLeft} />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
      }}>

      <PlayerSide
        player={state.playerA}
        name={nameA}
        side="A"
        playerColor={COLORS.playerA}
        onMove={moveCannon}
        onShoot={shoot}
      />

      <div style={{
        width: '2px',
        backgroundColor: '#374151',
        flexShrink: 0,
      }} />

      <PlayerSide
        player={state.playerB}
        name={nameB}
        side="B"
        playerColor={COLORS.playerB}
        onMove={moveCannon}
        onShoot={shoot}
      />
      </div>
    </div>
  );
}
