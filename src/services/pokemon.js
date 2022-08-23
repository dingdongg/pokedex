import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const get = async (pokemonName) => {
    const response = await axios.get(`${baseUrl}${pokemonName}`, {mode: 'cors'});
    return response;
}

const methods = {
    get
};

export default methods;