import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function fetchPokemon(query, pageNumber) {
    
    // public states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // private states
    const OFFSET_INCREMENT_FACTOR = 20;
    const [offset, setOffset] = useState(20 * (pageNumber - 1)); // start with the first resource
    const [limit, setLimit] = useState(20); // fetch 20 resources at a time

    // TODO: don't worry about the search/filter function right now, focus on the
    //       infinite loading part
    useEffect(() => {

        axios({
            method: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/`,
            params: {limit, offset},
        }).then(response => {
            setOffset(offset + OFFSET_INCREMENT_FACTOR);
            console.log(response.data);
        }).catch(error => console.error(error));

    }, [pageNumber]);

    return {loading, hasMore, pokemonList, error};
}