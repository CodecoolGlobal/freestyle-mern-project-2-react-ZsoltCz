import Movie from "./Movie";

function Movies ({ movies }) {
    return (
        <div className="movieContainer">
            {movies.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                />
            ))}
        </div>
    );
}

export default Movies