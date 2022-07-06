import React from 'react';

const Overview = ({pokemonList, selectedIndex}) => {
    if (selectedIndex === -1) {
        return (
            <div>CLICK A POKEMON</div>
        );
    }
    return (
        <div className="overview">
            <img src={pokemonList[selectedIndex].bigIcon} alt="big icon of pokemon" />
            <div>{pokemonList[selectedIndex].name}</div>
            <span>type 1</span>
            <span>type 2</span>
        </div>
    );
};

export default Overview;