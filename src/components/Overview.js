import React from 'react';
const reqSvgs = require.context('../icons', true, /\.svg$/);
const paths = reqSvgs.keys();

const iconsRepo = paths.reduce((images, p) => {
    images[p.slice(2)] = reqSvgs(p);
    return images;
}, {});

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
                <div className={`icon ${pkmn.typeOne}`}>
                    <img
                        src={iconsRepo[`${pkmn.typeOne}.svg`]}
                        alt={pkmn.typeOne} />
                </div>
                {(pkmn.typeTwo ?
                    <div className={`icon ${pkmn.typeTwo}`}>
                        <img
                            src={iconsRepo[`${pkmn.typeTwo}.svg`]}
                            alt={pkmn.typeTwo} />
                    </div> :
                    '')}
            </div>
        </div>
    );
};

export default Overview;