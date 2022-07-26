import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState, useRef, useCallback} from 'react';
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

  const watcher = useRef(); // undefined at first
  const lastPokemonRef = useCallback(node => {
    if (loading) return; // prevent infinite API calls

    // disconnect from previous watcher element, if any
    if (watcher.current) watcher.current.disconnect();

    watcher.current = new IntersectionObserver(watchlist => {

      if (watcher[0].isIntersecting && hasMore) {
        setPageNumber(pageNumber + 1);
      }
    });

    if (node) watcher.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="App">
      {pokemonList.map((pokemon, index) => {
        if (pokemonList.length === index + 1) {
          return <div ref={lastPokemonRef} key={pokemon}>{pokemon}</div>
        }
        return <div key={pokemon}>{pokemon}</div>
      })}
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
