import React from 'react';
import PokemonEntry from './PokemonEntry';

const PokemonEntries = ({pokemonList, setSelectedIndex}) => {
    return (
        <div className="pkmn-entries">
            {pokemonList.map(pkmn => (
                <PokemonEntry 
                    key={Math.random() * 1000}
                    pokemon={pkmn}
                    setSelectedIndex={setSelectedIndex}
                >
                </PokemonEntry>
            ))}
        </div>
    );
};

export default PokemonEntries;