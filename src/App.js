import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState, useEffect} from 'react';
import fetchPokemon from './hooks/fetchPokemon';

function App() {

  // const [pokemonList, updatePokemonList] = useState([]);
  // const pokedexConfig = {
  //   cache: true,
  //   timeout: 5 * 10000,
  //   cacheImages: true,
  // }
  // const [pokedex] = useState(new Pokedex(pokedexConfig));
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [numLoaded, setNumLoaded] = useState(4);

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const {
    hasMore, 
    pokemonList,
    error,
    loading
  } = fetchPokemon(query, pageNumber);

  // run only once on reboot
  useEffect(() => {
    fetchPokedexData();
  }, []);

  async function fetchPokedexData() {

    let initialData = [];
    let count;
    for (let i = 1; i <= 4; i++) {
      try {
        await pokedex.getPokemonByName(i)
          .then((response) => {
            let parsedInfo = {
              name: response.name,
              id: response.id,
              smallIcon: response.sprites.versions['generation-viii'].icons.front_default,
              bigIcon: response.sprites.other['official-artwork'].front_default,
            };
            initialData = [...initialData, parsedInfo];
            count = i;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        throw error;
      }
    }
    setNumLoaded(count);
    updatePokemonList(initialData);
  }

  return (
    <div className="App">
      <Overview
        pokemonList={pokemonList}
        selectedIndex={selectedIndex}
      >
      </Overview>
      <div className="entries-container">
        <div className="search-bar-container">
          <input type="text" className="search-bar" size="25"/>
        </div>
        <PokemonEntries
          pokemonList={pokemonList}
          updatePokemonList={updatePokemonList}
          setSelectedIndex={setSelectedIndex}
        >
        </PokemonEntries>
      </div>
    </div>
  );
}

export default App;
