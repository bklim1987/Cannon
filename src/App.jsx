import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Game from './components/Game.jsx';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('menu');

  if (screen === 'game') {
    return <Game onBack={() => setScreen('menu')} />;
  }

  return <Menu onStart={() => setScreen('game')} />;
}
