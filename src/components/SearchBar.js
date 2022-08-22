import React from "react";
import { useState } from "react";


const SearchBar = ({ searchPokemon }) => {

    const [text, setText] = useState('');

    const doSomething = (e) => {
        e.preventDefault();
        searchPokemon(text);
    }

    return (
        <div className='search-bar'>
            <form onSubmit={doSomething}>
                <input
                    type="text"
                    placeholder="Name of pokemon"
                    value={text}
                    onChange={({ target }) => setText(target.value)}
                 />
                 <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;