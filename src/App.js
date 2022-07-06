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

    for (let i = 1; i <= 4; i++) {
      try {
        pokedex.getPokemonByName(i)
          .then((response) => {
            // console.log(response.sprites.versions['generation-viii'].icons.front_default);
            updatePokemonList([...pokemonList, {
              name: response.name,
              id: response.id,
              icon: response.sprites.versions['generation-viii'].icons.front_default
            }]);
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          })
      } catch (error) {
        throw error;
      }
    }
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
