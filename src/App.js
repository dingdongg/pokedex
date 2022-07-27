import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState, useRef, useCallback} from 'react';
import fetchPokemon from './hooks/FetchPokemon';
import PokemonEntry from './components/PokemonEntry';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

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

    watcher.current = new IntersectionObserver(watchList => {

      if (watchList[0].isIntersecting && hasMore) {
        setPageNumber(pageNumber + 1);
      }
    });

    if (node) watcher.current.observe(node);
  }, [loading, hasMore]);

  function updateSelected(e, pokemon) {
      setSelectedIndex(pokemon.id - 1);
  }

  return (
    <div className="App">
      {pokemonList.map((pokemon, index) => {
        if (pokemonList.length === index + 1) {
          return <div key={pokemon.name} ref={lastPokemonRef} className={`pkmn-entry ${pokemon.name}`} onClick={(e) => updateSelected(e, pokemon)}>
                      <img src={pokemon.smallIcon} alt={`image of ${pokemon.name}`} />
                      <div className="pkmn-name">{pokemon.name}</div>
                      <div className="pkmn-id">{pokemon.id}</div>
                  </div>
        }
        return <PokemonEntry
                  key={pokemon.name}
                  pokemon={pokemon}
                  setSelectedIndex={setSelectedIndex}
                >
                </PokemonEntry>
      })}
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
