# 数字大炮 (Number Cannon)

A math educational game built with React + Vite, supporting both single-player and two-player modes.

## Overview
Players control cannons, shooting prime number projectiles at falling composite number monsters. Monsters are destroyed via visual short division (dividing by primes until the value reaches 1).

## Target
- 10-11 year old students on classroom touch screens (1920x1080)
- Single-player mode optimized for mobile phones
- Touch-optimized with 48px minimum touch targets

## Tech Stack
- React (Vite) - JavaScript, no TypeScript
- CSS inline styles (no Tailwind)
- Port 5000 for dev server
- Web Audio API for sound effects (no audio files)
- localStorage for score recording

## Project Structure
```
src/
  index.jsx              - Entry point
  App.jsx                - Screen router (menu/solo/game/leaderboard)
  App.css                - Global styles + animations
  components/
    Menu.jsx             - Start screen with instructions + mode selection
    Game.jsx             - Two-player game container
    SoloGame.jsx         - Single-player game (full-screen, mobile-friendly)
    PlayerSide.jsx       - Single player's half in two-player mode
    GameGrid.jsx         - 5x10 grid rendering with monsters, projectiles, escape effects
    MonsterCell.jsx      - Monster display (small/big/boss with distinct visuals)
    PrimeButton.jsx      - Prime number shooting buttons
    Projectile.jsx       - Projectile flight animation
    Timer.jsx            - Countdown timer display
    Results.jsx          - Two-player end-of-game results
    Leaderboard.jsx      - Score history viewer with tabs (all/solo/duo)
  hooks/
    useGameLoop.js       - Two-player game loop (100ms tick)
    useSoloGameLoop.js   - Single-player game loop
  utils/
    constants.js         - All game constants, colors, monster type configs
    monsters.js          - Monster creation/spawning logic
    sounds.js            - Web Audio API sound effects (hit/miss/kill/victory)
    scores.js            - localStorage score persistence (save/load/clear)
```

## Game Modes
- Single-player challenge: Full-screen, 60 seconds, score saved locally
- Two-player split-screen: Side-by-side on 1920x1080, both scores saved
- Tournament mode: Via URL params, skips menu, sends postMessage on end

## Difficulty Modes
- Easy mode: Prime pool [2, 3, 5] — suitable for 9-year-olds
- Normal mode: Prime pool [2, 3, 5, 7, 11, 13] — full challenge
- Menu shows two difficulty buttons for duo mode; single-player uses normal by default
- Tournament mode reads difficulty from URL param `difficulty=easy` (defaults to normal)

## Key Mechanics
- Monster types: small (2 factors, 100pts), big (3 factors, 200pts), boss (5 factors, 500pts)
- Wrong shot penalty: 1s full lockout
- Combo system: 10 consecutive hits = 1.5x multiplier
- Monster escape: Red flash + score deduction warning when monsters reach bottom
- Empty board auto-spawn: When all monsters are cleared, a new small monster spawns immediately

## Player Colors
- Player A: Cyan (#38bdf8)
- Player B: Purple (#c084fc)

## Sound Effects
- Hit: Short sine tone (600Hz, 60ms)
- Miss: Low square wave (150Hz, 150ms)
- Kill: Two-note ascending chime; Boss kill adds third higher note
- Victory: Four-note ascending melody on results screen
- Stereo panning: A=-0.9 (left), B=0.9 (right); pitch shifted per player

## Tournament Hub Integration
- URL params: teamA/playerA, teamB/playerB, mode, duration, matchId, difficulty
- Sends `tournamentMatchEnd` postMessage on game end with scores and stats

## Score Recording
- All scores saved to localStorage (max 50 records)
- Records: mode, name, score, kills, maxCombo, missed, locks, result, date
- Leaderboard viewable from main menu with filtering by mode
