import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState, useEffect} from 'react';
import Pokedex from 'pokedex-promise-v2';

function App() {

  const [pokemonList, updatePokemonList] = useState([]);
  const pokedexConfig = {
    cache: true,
    timeout: 5 * 10000,
    cacheImages: true,
  }
  const [pokedex] = useState(new Pokedex(pokedexConfig));
  const [selectedIndex, setSelectedIndex] = useState(0);

  // run only once on reboot
  useEffect(() => {
    fetchPokedexData();
  }, []);

  async function fetchPokedexData() {

    let initialData = [];
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
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        throw error;
      }
    }
    updatePokemonList(initialData);
  }

  function updateSelected(e) {
    setSelectedIndex(parseInt(e.target.children[2].textContent) - 1);
  }


  return (
    <div className="App">
      <Overview></Overview>
      <PokemonEntries 
        pokemonList={pokemonList} 
        updatePokemonList={updatePokemonList}
        selectedIndex={selectedIndex}
        updateSelected={updateSelected}
      >
      </PokemonEntries>
    </div>
  );
}

export default App;
