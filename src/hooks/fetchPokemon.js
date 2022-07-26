import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FetchPokemon(query, pageNumber) {
    
    // public states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // private states
    const OFFSET_INCREMENT_FACTOR = 20;
    const RESULTS_PER_PAGE = 20;
    const [offset, setOffset] = useState(RESULTS_PER_PAGE * (pageNumber - 1));
    const [limit, setLimit] = useState(RESULTS_PER_PAGE); 

    // TODO: don't worry about the search/filter function right now, focus on the
    //       infinite loading part
    useEffect(() => {

        setLoading(true);
        setError(false);

        axios({
            method: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/`,
            params: {limit, offset},
        }).then(response => {
            setOffset(offset + OFFSET_INCREMENT_FACTOR);
            console.log(response.data.results);
            setPokemonList(pokemonList.concat(...response.data.results.map(pkmn => pkmn.name)));
            setLoading(false);
            setHasMore(response.data.results.length >= RESULTS_PER_PAGE);
        }).catch(error => {
            setError(true);
            console.error(error);
        });

    }, [pageNumber]);

    return {loading, hasMore, pokemonList, error};
}
