import React from 'react';

const PokemonEntry = ({pokemon}) => {
    return (
        <div className="pkmn-entry">
            <img src={pokemon.icon} alt="icon goes here" />
            <div className="pkmn-name">{pokemon.name}</div>
            <div className="pkmn-id">{pokemon.id}</div>
        </div>
    );
};

export default PokemonEntry;