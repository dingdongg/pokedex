import React from 'react';
import PokemonEntry from './PokemonEntry';

const PokemonEntries = ({pokemonList, updatePokedex}) => {
    return (
        <div className="pkmn-entries">
            {pokemonList.map(pkmn => (
                <PokemonEntry 
                    key={Math.random() * 1000}
                    pokemon={pkmn}
                >
                </PokemonEntry>
            ))}
        </div>
    );
};

export default PokemonEntries;