import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const get = (pokemonName) => {
    axios.get(`${baseUrl}${pokemonName}`, {mode: 'cors'})
        .then(response => {
            console.log(response.data);
        });
}

export default { get };