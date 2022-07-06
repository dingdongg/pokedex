import React from 'react';
import PokemonEntry from './PokemonEntry';

const PokemonEntries = ({pokemonList, updatePokedex, selectedIndex, updateSelected}) => {
    return (
        <div className="pkmn-entries">
            {pokemonList.map(pkmn => (
                <PokemonEntry 
                    key={Math.random() * 1000}
                    pokemon={pkmn}
                    updateSelected={updateSelected}
                >
                </PokemonEntry>
            ))}
        </div>
    );
};

export default PokemonEntries;