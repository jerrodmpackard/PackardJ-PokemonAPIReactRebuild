import React from 'react';
import './App.css';
import HomePageComponent from './Components/HomePageComponent';
import background from './Assets/PokemonWildAreaNight.jpg'

function App() {
  return (
    <div className=' bg-cover bg-fixed h-full' style={{ backgroundImage: `url(${background})`}}>
      <HomePageComponent />
    </div>
  );
}

export default App;
