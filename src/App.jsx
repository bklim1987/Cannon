import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Game from './components/Game.jsx';
import SoloGame from './components/SoloGame.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import './App.css';

function isTournamentMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'tournament';
}

export default function App() {
  const [screen, setScreen] = useState(isTournamentMode() ? 'game' : 'menu');
  const [difficulty, setDifficulty] = useState('normal');

  if (screen === 'game') {
    return <Game difficulty={difficulty} onBack={() => setScreen('menu')} onLeaderboard={() => setScreen('leaderboard')} />;
  }

  if (screen === 'solo') {
    return <SoloGame difficulty={difficulty} onBack={() => setScreen('menu')} onLeaderboard={() => setScreen('leaderboard')} />;
  }

  if (screen === 'leaderboard') {
    return <Leaderboard onBack={() => setScreen('menu')} />;
  }

  return (
    <Menu
      onStartSolo={(diff) => { setDifficulty(diff); setScreen('solo'); }}
      onStartDuo={(diff) => { setDifficulty(diff); setScreen('game'); }}
      onLeaderboard={() => setScreen('leaderboard')}
    />
  );
}
