import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState} from 'react';
import fetchPokemon from './hooks/FetchPokemon';

function App() {

  // const [pokemonList, updatePokemonList] = useState([]);
  // const pokedexConfig = {
  //   cache: true,
  //   timeout: 5 * 10000,
  //   cacheImages: true,
  // }
  // const [pokedex] = useState(new Pokedex(pokedexConfig));
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(23);

  const {
    hasMore, 
    pokemonList,
    error,
    loading
  } = fetchPokemon(query, pageNumber);

  // run only once on reboot
  // useEffect(() => {
  //   fetchPokedexData();
  // }, []);

  // async function fetchPokedexData() {

  //   let initialData = [];
  //   let count;
  //   for (let i = 1; i <= 4; i++) {
  //     try {
  //       await pokedex.getPokemonByName(i)
  //         .then((response) => {
  //           let parsedInfo = {
  //             name: response.name,
  //             id: response.id,
  //             smallIcon: response.sprites.versions['generation-viii'].icons.front_default,
  //             bigIcon: response.sprites.other['official-artwork'].front_default,
  //           };
  //           initialData = [...initialData, parsedInfo];
  //           count = i;
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  //   setNumLoaded(count);
  //   updatePokemonList(initialData);
  // }

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
