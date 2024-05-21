import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [dices, setDices] = useState([1, 1, 1]);
  const [showRerollSixesButton, setShowRerollSixesButton] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScores, setPlayerScores] = useState([0, 0]);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const playDiceRollSound = () => {
    const audio = new Audio('/sounds/dice-roll.mp3');
    audio.play();
  };

  const rollDices = () => {
    setShaking(true);
    playDiceRollSound();
    setTimeout(() => {
      const newDices = dices.map(() => Math.floor(Math.random() * 6) + 1);
      setDices(newDices);
      setShaking(false);

      if (newDices.includes(6)) {
        setShowRerollSixesButton(true);
      } else {
        setShowRerollSixesButton(false);
      }

      if (checkVictory(newDices)) {
        alert(`Le joueur ${currentPlayer} a gagné avec la combinaison 4, 2, 1!`);
        updateScore();
      } else {
        switchPlayer();
      }
    }, 500); // Duration of the shake animation
  };

  const rerollSixes = () => {
    setShaking(true);
    playDiceRollSound();
    setTimeout(() => {
      const newDices = dices.map(dice => (dice === 6 ? Math.floor(Math.random() * 6) + 1 : dice));
      setDices(newDices);
      setShaking(false);

      if (newDices.includes(6)) {
        setShowRerollSixesButton(true);
      } else {
        setShowRerollSixesButton(false);
      }

      if (checkVictory(newDices)) {
        alert(`Le joueur ${currentPlayer} a gagné avec la combinaison 4, 2, 1!`);
        updateScore();
      }
    }, 500); // Duration of the shake animation
  };

  const resetGame = () => {
    setDices([1, 1, 1]);
    setShowRerollSixesButton(false);
  };

  const checkVictory = (dices) => {
    const sortedDices = [...dices].sort();
    return JSON.stringify(sortedDices) === JSON.stringify([1, 2, 4]);
  };

  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };

  const updateScore = () => {
    setPlayerScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[currentPlayer - 1] += 1;
      return newScores;
    });
    setScore(score + 1);
  };

  return (
    <div className="App">
      <h1>Jeu de Dés 421</h1>
      <div className="score">Score : {score}</div>
      <div className="player-scores">
        <div>Joueur 1: {playerScores[0]}</div>
        <div>Joueur 2: {playerScores[1]}</div>
      </div>
      <div className="current-player">Tour du joueur : {currentPlayer}</div>
      <div className="dices">
        {dices.map((dice, index) => (
          <img
            key={index}
            className={`dice ${shaking ? 'shake' : ''}`}
            src={`/images/d${dice}.png`}
            alt={`Dice ${dice}`}
          />
        ))}
      </div>
      <button className="roll-button" onClick={rollDices}>Lancer les Dés</button>
      {showRerollSixesButton && (
        <button className="reroll-sixes-button" onClick={rerollSixes}>Relancer les 6</button>
      )}
      <button className="reset-button" onClick={resetGame}>Rejouer</button>
    </div>
  );
}

export default App;
