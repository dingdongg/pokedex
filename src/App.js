import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';
import React, {useState, useEffect} from 'react';
import Pokedex from 'pokedex-promise-v2';

function App() {

  const [pokemonList, updatePokemonList] = useState([]);
  const [pokedex] = useState(new Pokedex());

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
              icon: response.sprites.versions['generation-viii'].icons.front_default,
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


  return (
    <div className="App">
      <Overview></Overview>
      <PokemonEntries 
        pokemonList={pokemonList} 
        updatePokemonList={updatePokemonList}
      >
      </PokemonEntries>
    </div>
  );
}

export default App;
