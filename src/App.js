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
  const [darkMode, setDarkMode] = useState(false);

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

  const refreshSearch = (isUsed, result = null) => {
    setUseSearch(isUsed);
    if (result) setSearchedPokemon(parsePokemon(result));
  }

  const searchPokemon = async (pokemonName) => {
    if (pokemonName === '') {
      refreshSearch(false);
      return;
    }
    try {
      const results = await pokemonService.get(pokemonName);
      refreshSearch(true, results);
    } catch (exception) {
      console.log(exception);
      refreshSearch(false);
    }
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    darkModeRef.current.classList.toggle('dark-on');
  }

  const darkModeRef = useRef();

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
      <div className='dark-mode-toggler' onClick={toggleDarkMode} ref={darkModeRef}>
        <img className='dark-mode-icon' src={require('./icons/misc_images/dark-mode.png')} alt="dark mode toggle" />
      </div>
      <div>{loading ? 'Loading...' : ""}</div>
      <div>{error ? 'error' : ""}</div>
    </div>
  );
}

export default App;
