import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function fetchPokemon(query, pageNumber) {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const OFFSET_INCREMENT_FACTOR = 20;

    const [offset, setOffset] = useState(0); // start with the first resource
    const [limit, setLimit] = useState(20); // fetch 20 resources at a time

    useEffect(() => {


    }, []);

}
