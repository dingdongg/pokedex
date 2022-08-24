import {useState, useEffect} from 'react';
import axios from 'axios';

export default function FetchPokemon(query, pageNumber) {
    
    // public states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // private states (for API requests)
    const loadingNumber = 44;
    const OFFSET_INCREMENT_FACTOR = loadingNumber;
    const RESULTS_PER_PAGE = loadingNumber;
    const [offset, setOffset] = useState(RESULTS_PER_PAGE * (pageNumber - 1));
    const [limit] = useState(RESULTS_PER_PAGE); 

    const parsePokemon = (response) => {
        let rawData = response.data;
        return {
            name: rawData.name,
            id: rawData.id,
            smallIcon: rawData.sprites.versions['generation-viii'].icons.front_default,
            bigIcon: rawData.sprites.other['official-artwork'].front_default,
            typeOne: rawData.types[0].type.name,
            typeTwo: (rawData.types.length === 2) ? rawData.types[1].type.name : '',
        };
    }

    const resolveInOrder = async (batch, last) => {
        
        const promises = await Promise.all(batch.map(obj => {
            return axios.get(obj.url)
                            .then(response => parsePokemon(response))
                            .catch(e => console.error(e));
        }));
        const lastName = await axios.get(last.url)
                                    .then(response => parsePokemon(response))
                                    .catch(e => console.error(e));

        setPokemonList(pokemonList.concat(...promises, lastName));
    };

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
            // before the last pokemon (first batch of API calls in no particular order amongst themselves)
            resolveInOrder(firstBatch, lastPokemon);

            setLoading(false);
            setHasMore(response.data.results.length >= RESULTS_PER_PAGE);   
        }).catch(error => {
            setError(true);
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    return {loading, hasMore, pokemonList, error, parsePokemon};
}
