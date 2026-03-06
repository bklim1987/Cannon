# 数字大炮 (Number Cannon)

A two-player educational math game built with React + Vite.

## Overview
Two players each control cannons on split-screen, shooting prime number projectiles at falling composite number monsters. Monsters are destroyed via visual short division (dividing by primes until the value reaches 1).

## Target
- 10-11 year old students on classroom touch screens (1920x1080)
- Touch-optimized with 48px minimum touch targets

## Tech Stack
- React (Vite) - JavaScript, no TypeScript
- CSS inline styles (no Tailwind)
- Port 5000 for dev server

## Project Structure
```
src/
  index.jsx              - Entry point
  App.jsx                - Screen router (menu/game)
  App.css                - Global styles + animations
  components/
    Menu.jsx             - Start screen with instructions
    Game.jsx             - Main game container, countdown, state management
    PlayerSide.jsx       - Single player's half of the screen
    GameGrid.jsx         - 5x10 grid rendering
    MonsterCell.jsx      - Individual monster display
    PrimeButton.jsx      - Prime number shooting buttons
    Timer.jsx            - Countdown timer display
    Results.jsx          - End-of-game results screen
  hooks/
    useGameLoop.js       - Core game loop (100ms tick), player state, shooting/spawning logic
  utils/
    constants.js         - All game constants, colors, monster type configs
    monsters.js          - Monster creation/spawning logic
```

## Game Modes
- Mode A (Tournament): 60-second timed match, score comparison

## Key Mechanics
- 6 prime buttons: [2, 3, 5, 7, 11, 13]
- Monster types: small (2 factors, 100pts), big (3 factors, 200pts), boss (5 factors, 500pts)
- Wrong shot penalty: 1s full lockout
- Combo system: 10 consecutive hits = 1.5x multiplier

## Tournament Hub Integration
- URL params: playerA, playerB, mode, duration
- Sends postMessage on game end with scores and stats
