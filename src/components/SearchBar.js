import React from "react";


const SearchBar = (props) => {

    const doSomething = (e) => {
        e.preventDefault();
        console.log('search clicked');
    }

    return (
        <div className='search-bar'>
            <form onSubmit={doSomething}>
                <input
                    type="text"
                    placeholder="Search for a pokemon"
                 />
                 <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;