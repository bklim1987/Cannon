import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Game from './components/Game.jsx';
import './App.css';

function isTournamentMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'tournament';
}

export default function App() {
  const [screen, setScreen] = useState(isTournamentMode() ? 'game' : 'menu');

  if (screen === 'game') {
    return <Game onBack={() => setScreen('menu')} />;
  }

  return <Menu onStart={() => setScreen('game')} />;
}
