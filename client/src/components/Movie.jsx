function Movie({ movie, user, setUser, setMessage }) {

    const favButtonHandler = async (event) => {
        let newFavorites = [...user.favorites];
        let operation = null;
        if (event.target.textContent === "Remove") {
            newFavorites = newFavorites.filter(element => element !== movie.imdbID);
            operation = 'removed from';
        }
        else {
            newFavorites.push(movie.imdbID);
            operation = "added to";
        }
        try {
            const response = await fetch(`http://localhost:3001/api/v1/profile/${user["_id"]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    favorites: newFavorites
                })
            });
            console.log(response);
            
            if (response.status === 200) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                console.log(updatedUser);
                console.log("Successfully added to favorites");
                setMessage({
                    class: "messageSuccess",
                    text: `${movie.Title} ${operation} favorites`
                });
            }
            else {
                console.error("An error has occured");
                setMessage({
                    class: "messageFailure",
                    text: `An error has occured`
                });
            }


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="movieCard">
            <div className="imageContainer">
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="movieInfoContainer">
                <h2>{movie.Title}</h2>
                <p>Year: {movie.Year}</p>
                {user ? user.favorites.includes(movie.imdbID) ? (
                    <button className="removeFavButton" onClick={favButtonHandler}>Remove</button>
                ) : (
                    <button className="addFavButton" onClick={favButtonHandler}>Favorite</button>
                ) : ""}
            </div>
        </div>
    );
}

export default Movie