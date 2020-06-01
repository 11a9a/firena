import React, { useState } from 'react';
import './App.css';
import Lobby from './App/Lobby';
import Game from './App/Game';
import { SCREEN } from './App/Constants';

function App() {
  const [screen, setScreen] = useState(SCREEN.LOBBY);
  const [userName, setUsername] = useState('');
  const [score, setScore] = useState(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'row' }}>
      {screen === SCREEN.LOBBY ? (
        <Lobby userName = {userName} setUsername = {setUsername} setScreen = {setScreen}/>
      ) : (screen === SCREEN.GAME_OVER ? `Game Over, your score: ${score}` : (
        <Game userName = {userName} setScreen = {setScreen} setScore = {setScore}/>
      ))}
    </div>);
}

export default App;
