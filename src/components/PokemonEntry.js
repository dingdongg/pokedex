import { forwardRef, React } from 'react';

const PokemonEntry = forwardRef(({pokemon, setSelectedIndex}, refs) => {

    function updateSelected(e) {
        setSelectedIndex(pokemon.id - 1);
    }

    return (
        <div ref={refs} className={`pkmn-entry ${pokemon.name}`} onClick={updateSelected}>
            <img src={pokemon.smallIcon} alt={`${pokemon.name}`} />
            <div className="pkmn-name">{pokemon.name}</div>
            <div className="pkmn-id">{pokemon.id}</div>
        </div>
    );
});

export default PokemonEntry;