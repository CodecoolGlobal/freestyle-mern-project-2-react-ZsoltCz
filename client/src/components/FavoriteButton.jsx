import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function FavoriteButton({ movie, favButtonHandler }) {

    const { user } = useContext(UserContext);

    return user ? (
        user.favorites.includes(movie.imdbID) ? (
            <button className="removeFavButton" onClick={favButtonHandler}>
                Remove
            </button>
        ) : (
            <button className="addFavButton" onClick={favButtonHandler}>
                Favorite
            </button>
        )
    ) : (
        ""
    );
}
