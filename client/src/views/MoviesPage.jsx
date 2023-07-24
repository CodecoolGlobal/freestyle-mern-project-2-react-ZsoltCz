import Movies from '../components/Movies';
import { useState, useEffect } from 'react'





function MoviesPage({ APIKEY, user, setUser, setMessage }) {

    const [movies, setMovies] = useState(null);

    const [page, setPage] = useState(1);

    const [userInput, setUserInpur] = useState("");

    const [maxPageNumber, setMaxPageNumber] = useState(null);

    const movieSearchHandler = (event) => {
        setUserInpur(event.target.value);
    }

    useEffect((() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${userInput}&type=movie&page=${page}&apikey=${APIKEY}`);
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
    }), [page, userInput]);

    const pageHandler = (event) => {
        setPage(prevPage => event.target.textContent === "Prev" ? prevPage - 1 : prevPage + 1);
    }

    

    return (
        <main>
            <label>Search movies:</label>
            <input
                className="searchBar"
                placeholder="Search for movies..."
                value={userInput}
                onChange={movieSearchHandler}
            ></input>
            {movies && (
                <>
                    <Movies
                        user={user}
                        setUser={setUser}
                        movies={movies}
                        setMessage={setMessage}
                    />
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