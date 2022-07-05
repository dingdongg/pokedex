import React from 'react';
import PokemonEntry from './PokemonEntry';

const PokemonEntries = () => {
    return (
        <div className="pkmn-entries">
            <PokemonEntry></PokemonEntry>
            <PokemonEntry></PokemonEntry>
            <PokemonEntry></PokemonEntry>
            <PokemonEntry></PokemonEntry>
        </div>
    );
};

export default PokemonEntries;