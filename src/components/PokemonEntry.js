import React from 'react';

const PokemonEntry = ({pokemon, setSelectedIndex}) => {

    function updateSelected(e) {
        setSelectedIndex(pokemon.id - 1);
    }

    return (
        <div className={`pkmn-entry ${pokemon.name}`} onClick={updateSelected}>
            <img src={pokemon.smallIcon} alt={`image of ${pokemon.name}`} />
            <div className="pkmn-name">{pokemon.name}</div>
            <div className="pkmn-id">{pokemon.id}</div>
        </div>
    );
};

export default PokemonEntry;