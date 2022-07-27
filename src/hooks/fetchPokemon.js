import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FetchPokemon(query, pageNumber) {
    
    // public states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // private states
    const OFFSET_INCREMENT_FACTOR = 40;
    const RESULTS_PER_PAGE = 40;
    const [offset, setOffset] = useState(RESULTS_PER_PAGE * (pageNumber - 1));
    const [limit, setLimit] = useState(RESULTS_PER_PAGE); 

    const resolveInOrder = async (batch, last) => {
        
        const promises = await Promise.all(batch.map(obj => {
            return axios.get(obj.url)
                            .then(response => response.data.name)
                            .catch(e => console.error(e));
        }));
        console.log('first batch', promises);

        const lastName = await axios.get(last.url)
                                    .then(response => response.data.name)
                                    .catch(e => console.error(e));
        console.log('last promise', lastName);
    }

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
            let results = response.data.results;
            let firstBatch = results.slice(0, results.length - 1);
            let lastPokemon = results.slice(-1)[0];
            setPokemonList(pokemonList.concat(...firstBatch));

            // need API calls to all but the last pokemon on the page to load
            // before the last pokemon (in no particular order)
            resolveInOrder(firstBatch, lastPokemon);
            
            // setLoading(false);
            // setHasMore(response.data.results.length >= RESULTS_PER_PAGE);   
        }).catch(error => {
            setError(true);
            console.error(error);
        });

    }, [pageNumber]);

    return {loading, hasMore, pokemonList, error};
}
