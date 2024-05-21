import React, { useState } from 'react';
import './App.css';

function App() {
  const [dices, setDices] = useState([1, 1, 1]);

  const checkVictory = (dices) => {
    const sortedDices = [...dices].sort();
    return JSON.stringify(sortedDices) === JSON.stringify([1, 2, 4]);
  };

  const rollDices = () => {
    const newDices = dices.map(dice => Math.floor(Math.random() * 6) + 1);
    setDices(newDices);

    if (checkVictory(newDices)) {
      alert('Vous avez gagné avec la combinaison 4, 2, 1!');
    }
  };

  return (
    <div className="App">
      <h1>Jeu de Dés 421</h1>
      <div className="dices">
        {dices.map((dice, index) => (
          <div key={index} className="dice">{dice}</div>
        ))}
      </div>
      <button className="roll-button" onClick={rollDices}>Lancer les Dés</button>
    </div>
  );
}

export default App;
