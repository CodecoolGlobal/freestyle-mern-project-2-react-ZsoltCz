import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext";
import { UserContext } from "../context/userContext";

export const favButtonHandler = async (event, movie, user, setUser, setMessage ) => {
    let newFavorites = [...user.favorites];
    let operation = null;
    if (event.target.textContent === "Remove") {
        newFavorites = newFavorites.filter(
            (element) => element !== movie.imdbID
        );
        operation = "removed from";
    } else {
        newFavorites.push(movie.imdbID);
        operation = "added to";
    }
    try {
        const response = await fetch(
            `http://localhost:3001/api/v1/profile/${user["_id"]}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...user,
                    favorites: newFavorites,
                }),
            }
        );

        if (response.status === 200) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            console.log(updatedUser);
            console.log(`Successfully ${operation} favorites`);
            setMessage({
                class: "messageSuccess",
                text: `${movie.Title} ${operation} favorites`,
            });
        } else {
            console.error("An error has occured");
            setMessage({
                class: "messageFailure",
                text: `An error has occured`,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

function Movie({ movie }) {

    const { user, setUser } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const newFavButtonHandler = (event) =>
        favButtonHandler(event, movie, user, setUser, setMessage);

    return (
        <div className="movieCard">
            <div className="imageContainer">
                <Link to={`/movies/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                </Link>
            </div>
            <div className="movieInfoContainer">
                <h2>{movie.Title}</h2>
                <p>Year: {movie.Year}</p>
                <FavoriteButton favButtonHandler={newFavButtonHandler} movie={movie} />
            </div>
        </div>
    );
}

export default Movie