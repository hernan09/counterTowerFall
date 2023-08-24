import React, { useState } from 'react';
import './index.css'; // Estilos básicos

const Card = ({ name }) => {
  const [points, setPoints] = useState(0);

  const increasePoints = () => {
    setPoints(points + 1);
  };

  const decreasePoints = () => {
    if (points > 0) {
      setPoints(points - 1);
    }
  };

  return (
    <div className="card">
      <h2 className='name'>{name}</h2>
      <p className='puntos'>{points}</p>
      <div className='contetn-button'>
      <button onClick={increasePoints}>Add Point</button>
      <button className='resta' onClick={decreasePoints}>Quit point</button>
      </div>
    </div>
  );
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddCard = () => {
    if (inputValue.trim() !== '') {
      setCards([...cards, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="app">
      <h1 style={{'color':'white'}}>Tower fall counter</h1>
      <div className="input-container">
        <input
          className='inputname'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a name"
        />
        <button className='addplayer' onClick={handleAddCard}>Add player</button>
      </div>
      <div className="card-container">
        {cards.map((name, index) => (
          <Card key={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default App;
