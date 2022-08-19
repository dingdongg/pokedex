import './App.css';
import Overview from './components/Overview';
import React, {useState, useRef, useCallback} from 'react';
import FetchPokemon from './hooks/fetchPokemon';
import PokemonEntry from './components/PokemonEntry';
import SearchBar from './components/SearchBar';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const {
    hasMore, 
    pokemonList,
    error,
    loading
  } = FetchPokemon(query, pageNumber);

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
      <div className='fixed-left'>
        <SearchBar></SearchBar>
        <Overview pokemonList={pokemonList} selectedIndex={selectedIndex}></Overview>
      </div>
      <div className="pokemons-container">
        {pokemonList.map((pokemon, index) => {
          if (pokemonList.length === index + 1) {
            return <div key={pokemon.name} ref={lastPokemonRef} className={`pkmn-entry ${pokemon.name}`} onClick={(e) => updateSelected(e, pokemon)}>
                        <img src={pokemon.smallIcon} alt={`${pokemon.name}`} />
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
      </div>
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
