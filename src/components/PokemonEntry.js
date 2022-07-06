import React from 'react';

const PokemonEntry = ({pokemon, updateSelected}) => {

    return (
        <div className="pkmn-entry" onClick={updateSelected}>
            <img src={pokemon.smallIcon} alt="icon goes here" />
            <div className="pkmn-name">{pokemon.name}</div>
            <div className="pkmn-id">{pokemon.id}</div>
        </div>
    );
};

export default PokemonEntry;