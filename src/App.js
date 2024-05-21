import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dices, setDices] = useState([1, 1, 1]);
  const [showRerollSixesButton, setShowRerollSixesButton] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScores, setPlayerScores] = useState([0, 0]);
  const [shaking, setShaking] = useState(false);
  const [playerNames, setPlayerNames] = useState(['Joueur 1', 'Joueur 2']);
  const [isSettingNames, setIsSettingNames] = useState(true);
  const [nameInputs, setNameInputs] = useState(['', '']);

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

      if (checkVictory(newDices)) {
        alert(`${playerNames[currentPlayer - 1]} a gagné avec la combinaison 4, 2, 1!`);
        updateScore();
      }

      if (newDices.includes(6)) {
        setShowRerollSixesButton(true);
      } else {
        setShowRerollSixesButton(false);
        switchPlayer();
      }

    }, 500);
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
        switchPlayer();
      }

      if (checkVictory(newDices)) {
        alert(`${playerNames[currentPlayer - 1]} a gagné avec la combinaison 4, 2, 1!`);
        updateScore();
      }
    }, 500);
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

  const handleNameChange = (index, event) => {
    const newNames = [...nameInputs];
    newNames[index] = event.target.value;
    setNameInputs(newNames);
  };

  const startGame = () => {
    if (nameInputs[0] && nameInputs[1]) {
      setPlayerNames(nameInputs);
      setIsSettingNames(false);
    } else {
      alert('Veuillez entrer des noms pour les deux joueurs.');
    }
  };

  if (isSettingNames) {
    return (
      <div className="App">
        <h1>Jeu de Dés 421</h1>
        <div className="name-inputs">
          <div>
            <label>
              Nom du Joueur 1:
              <input
                type="text"
                value={nameInputs[0]}
                onChange={(e) => handleNameChange(0, e)}
              />
            </label>
          </div>
          <div>
            <label>
              Nom du Joueur 2:
              <input
                type="text"
                value={nameInputs[1]}
                onChange={(e) => handleNameChange(1, e)}
              />
            </label>
          </div>
          <button className="start-button" onClick={startGame}>Commencer le Jeu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Jeu de Dés 421</h1>
      <div className="score">Score : {score}</div>
      <div className="player-scores">
        <div>{playerNames[0]}: {playerScores[0]}</div>
        <div>{playerNames[1]}: {playerScores[1]}</div>
      </div>
      <div className="current-player">Tour de : {playerNames[currentPlayer - 1]}</div>
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
