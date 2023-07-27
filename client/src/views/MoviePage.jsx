import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { favButtonHandler } from "../components/Movie";
import { UserContext } from "../context/userContext";
import { MessageContext } from "../context/messageContext";

const APIKEY = import.meta.env.VITE_APIKEY;

export default function MoviePage() {

    const { id } = useParams();

    const { setMessage } = useContext(MessageContext);
    const { user, setUser } = useContext(UserContext);

    const [movie, setMovie] = useState(null);

    const fetchMovie = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`);
            const movie = await response.json();

            if (movie.Response === "True") {
                setMovie(movie);
            }
            else {
                setMessage({message: movie.Error, class: "messageFailure"});
            }
        } catch (error) {
            setMessage({
                text: "An error has occured",
                class: "messageFailure",
            });
        }
    }

    useEffect(() => {
        fetchMovie();
    }, [id])

    const newFavButtonHandler = (event) =>
        favButtonHandler(event, movie, user, setUser, setMessage);

        console.log(movie)
    return (
        movie && (
            <main>
                <div className="mediaTitle">
                    <h1>
                        {movie.Title} ({movie.Year})
                    </h1>
                </div>
                <img src={movie.Poster} alt={movie.Title} />
                <div className="mediaDetails">
                    <span>IMDB Rating:</span> {movie.imdbRating}
                </div>
                {movie.totalSeasons && (
                    <div className="mediaDetails">
                        <span>Seasons:</span> {movie.totalSeasons}
                    </div>
                )}
                <div className="mediaDetails">
                    <span>Runtime:</span> {movie.Runtime}
                </div>
                <div className="mediaDetails">
                    <span>Genres:</span> {movie.Genre}
                </div>
                <div className="mediaDetails">{movie.Plot}</div>
                <div className="mediaDetails">
                    <span>Directors:</span> {movie.Director}
                </div>
                <div className="mediaDetails">
                    <span>Writers:</span> {movie.Writer}
                </div>
                <div className="mediaDetails">
                    <span>Actors:</span> {movie.Actors}
                </div>
                <FavoriteButton
                    favButtonHandler={newFavButtonHandler}
                    movie={movie}
                />
            </main>
        )
    );
}