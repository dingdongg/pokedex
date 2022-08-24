import React from 'react';

const Overview = ({pokemonList, selectedIndex}) => {
    if (selectedIndex === -1) {
        return (
            <div className="overview">CLICK A POKEMON</div>
        );
    }

    const pkmn = pokemonList[selectedIndex];

    return (
        <div className="overview">
            <img src={pkmn.bigIcon} alt="big icon of pokemon" />
            <div>{pkmn.name}</div>
            <div className="types-container">
                <span>{pkmn.typeOne}</span>
                <span>{(pkmn.typeTwo ? ` || ${pkmn.typeTwo}` : '')}</span>
            </div>
        </div>
    );
};

export default Overview;