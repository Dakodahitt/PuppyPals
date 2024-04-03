import './App.css';
import './index.css';

import { useState } from 'react';
import { puppyList } from './data.js';

function DogImage() {
  const [position, setPosition] = useState({
    left: `${Math.random() * 90}vw`, // Random left position
    top: `${Math.random() * 90}vh`, // Random top position
  });

  return (
    <img
      src="dog.png" // Add the path to your dog image here
      alt="Dog"
      className="dog"
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
      }}
    />
  );
}

function App() {
  const [puppies, setPuppies] = useState(puppyList);
  const [featPupId, setFeatPupId] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const handleClick = (puppyId) => {
    setFeatPupId(puppyId);
    setFadeIn(false); // Reset fadeIn to trigger the fade-in effect on next render
    setTimeout(() => {
      setFadeIn(true); // Trigger fade-in effect by setting fadeIn to true
    }, 0); // Ensure the state update occurs after the render cycle
  };

  const featuredPup = puppies.find((pup) => pup.id === featPupId);

  return (
    <div className="App">
      {puppies.map((puppy) => {
        return (
          <p className='puppy' onClick={() => handleClick(puppy.id)} key={puppy.id}>
            {puppy.name}
          </p>
        );
      })}
      {featPupId && (
        <div className={`info ${fadeIn ? 'fade-in' : ''}`}>
          <h2>{featuredPup.name}</h2>
          <ul>
            <li>Age: {featuredPup.age}</li>
            <li>Email: {featuredPup.email}</li>
          </ul>
        </div>
      )}
      {featPupId && <DogImage />} {/* Render DogImage component when a name is clicked */}
    </div>
  );
}

export default App;
