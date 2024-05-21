import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dices, setDices] = useState([1, 1, 1]);
  const [showRerollSixesButton, setShowRerollSixesButton] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const checkVictory = (dices) => {
    const sortedDices = [...dices].sort();
    return JSON.stringify(sortedDices) === JSON.stringify([1, 2, 4]);
  };

  const rollDices = () => {
    const newDices = dices.map(() => Math.floor(Math.random() * 6) + 1);
    setDices(newDices);

    if (newDices.includes(6)) {
      setShowRerollSixesButton(true);
    } else {
      setShowRerollSixesButton(false);
    }

    if (checkVictory(newDices)) {
      alert('Vous avez gagné avec la combinaison 4, 2, 1!');
      setScore(score + 1);
    }
  };

  const rerollSixes = () => {
    const newDices = dices.map(dice => (dice === 6 ? Math.floor(Math.random() * 6) + 1 : dice));
    setDices(newDices);

    if (newDices.includes(6)) {
      setShowRerollSixesButton(true);
    } else {
      setShowRerollSixesButton(false);
    }

    if (checkVictory(newDices)) {
      alert('Vous avez gagné avec la combinaison 4, 2, 1!');
      setScore(score + 1);
    }
  };

  const resetGame = () => {
    setDices([1, 1, 1]);
    setShowRerollSixesButton(false);
  };

  return (
    <div className="App">
      <h1>Jeu de Dés 421</h1>
      <div className="score">Score : {score}</div>
      <div className="dices">
        {dices.map((dice, index) => (
          <div key={index} className="dice">{dice}</div>
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
