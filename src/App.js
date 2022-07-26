import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState} from 'react';
import fetchPokemon from './hooks/FetchPokemon';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(23);

  const {
    hasMore, 
    pokemonList,
    error,
    loading
  } = fetchPokemon(query, pageNumber);

  return (
    <div className="App">
      {pokemonList.map(pokemon => {
        return <div key={pokemon}>{pokemon}</div>
      })}
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
