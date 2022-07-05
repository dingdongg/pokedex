import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState} from 'react';

function App() {

  const [pokedex, updatePokedex] = useState(['bulblar', 'yeyey']);

  return (
    <div className="App">
      <Overview></Overview>
      <PokemonEntries pokedex={pokedex} updatePokedex={updatePokedex}></PokemonEntries>
    </div>
  );
}

export default App;
