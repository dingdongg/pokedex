import React from 'react';
import PokemonEntry from './PokemonEntry';

const PokemonEntries = ({pokedex, updatePokedex}) => {
    return (
        <div className="pkmn-entries">
            {pokedex.map(pkmn => (
                <PokemonEntry key={Math.random() * 1000}></PokemonEntry>
            ))}
        </div>
    );
};

export default PokemonEntries;