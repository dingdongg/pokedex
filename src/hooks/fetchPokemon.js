import React, {useState, useEffect} from 'react';
import { Pokedex } from 'pokedex-promise-v2';
import PokeAPI from 'pokedex-promise-v2';

export default function fetchPokemon() {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    
}
