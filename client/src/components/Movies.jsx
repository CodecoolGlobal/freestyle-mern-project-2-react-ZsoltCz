import Movie from "./Movie"

function Movies ({ movies, user, setUser, setMessage }) {
    return (
        <div className="movieContainer">
            {movies.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    user={user}
                    setUser={setUser}
                    setMessage={setMessage}
                />
            ))}
        </div>
    );
}

export default Movies