import './App.css';
import Overview from './components/Overview';
import React, {useState, useRef, useCallback} from 'react';
import FetchPokemon from './hooks/fetchPokemon';
import PokemonEntry from './components/PokemonEntry';
import SearchBar from './components/SearchBar';
import pokemonService from './services/pokemon';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [query] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [useSearch, setUseSearch] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState({});

  const {
    hasMore, 
    pokemonList,
    parsePokemon,
    error,
    loading
  } = FetchPokemon(query, pageNumber);

  const watcher = useRef(); // undefined at first
  const nullRef = useRef();
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
  }, [loading, hasMore, pageNumber]);

  const searchPokemon = async (pokemonName) => {
    const results = await pokemonService.get(pokemonName);
    console.log(parsePokemon(results));
    setSearchedPokemon(parsePokemon(results));
    setUseSearch(true);
  }

  const renderSearched = () => (
      <PokemonEntry
        key={searchedPokemon.name}
        pokemon={searchedPokemon}
        setSelectedIndex={setSelectedIndex}
        ref={nullRef}>
      </PokemonEntry>
  )

  const renderList = () => (
      pokemonList.map((pokemon, index) => {
        return <PokemonEntry
                  key={pokemon.name}
                  pokemon={pokemon}
                  setSelectedIndex={setSelectedIndex}
                  ref={(pokemonList.length === index + 1) 
                        ? lastPokemonRef
                        : nullRef}>
                </PokemonEntry>
      })
  )

  return (
    <div className="App">
      <div className='fixed-left'>
        <SearchBar searchPokemon={searchPokemon}></SearchBar>
        {(!useSearch)
          ? <Overview pokemonList={pokemonList} selectedIndex={selectedIndex}></Overview>
          : <Overview pokemonList={[searchedPokemon]} selectedIndex={0}></Overview>}
      </div>
      <div className="pokemons-container">
        {(!useSearch) ? renderList() : renderSearched()}
      </div>
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
