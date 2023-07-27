import Movies from '../components/Movies';
import { useState, useEffect } from 'react'





function MoviesPage({ APIKEY }) {

    const [movies, setMovies] = useState(null);

    const [page, setPage] = useState(1);

    const [type, setType] = useState("movie");

    const [userInput, setUserInpur] = useState("");

    const [maxPageNumber, setMaxPageNumber] = useState(null);

    const movieSearchHandler = (event) => {
        setUserInpur(event.target.value);
    }

    const typeSelectHandler = (event) => {
        setType(event.target.value)
    }

    useEffect((() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${userInput}&type=${type}&page=${page}&apikey=${APIKEY}`);
                const movies = await response.json();


                if (movies.Response === "True") {
                    setMovies(movies.Search);
                    setMaxPageNumber(Math.ceil(parseInt(movies.totalResults) / 10));
                }


            } catch (error) {
                console.error(error);
            }
        }
        if (userInput) {
            fetchMovies();
        }
    }), [page, userInput, type]);

    const pageHandler = (event) => {
        setPage(prevPage => event.target.textContent === "Prev" ? prevPage - 1 : prevPage + 1);
    }

    

    return (
        <main>
            <label htmlFor="searchBar">Search media:</label>
            <div>
                <select value={type} onChange={typeSelectHandler}>
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>
                <input
                    id="searchBar"
                    className="searchBar"
                    placeholder="Search for movies..."
                    value={userInput}
                    onChange={movieSearchHandler}
                ></input>
            </div>
            {movies && (
                <>
                    <Movies movies={movies} />
                    <div>
                        <button
                            className="navButton"
                            disabled={page === 1}
                            onClick={pageHandler}
                        >
                            Prev
                        </button>
                        <button
                            className="navButton"
                            disabled={page === maxPageNumber}
                            onClick={pageHandler}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}

export default MoviesPage