import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Movies from '../components/Movies';
import { UserContext } from "../context/userContext";
import { MessageContext } from "../context/messageContext";

function ProfilePage({ APIKEY }) {
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const [userInput, setUserInput] = useState({
        userName: user.userName,
        email: user.email,
        password: "",
        newPassword: "",
    });

    const [favMovies, setFavMovies] = useState(null);

    useEffect(() => {
        const populateFavMovies = async () => {
            const responseArray = await Promise.all(user.favorites.map(imdbID => fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`)));
            const result = await Promise.all(responseArray.map(movie => movie.json()));
            setFavMovies(result);
        }
        populateFavMovies();
    }, []);

    const updateUserHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/profile/${user["_id"]}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInput),
                }
            );

            if (response.status === 200) {
                const updatedUser = await response.json();

                setUser(updatedUser);
                setEditMode(!editMode);
                setMessage({
                    text: "Successfully updated account",
                    class: "messageSuccess",
                });
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            setMessage({
                text: error.message,
                class: "messageFailure",
            });
        }
    };

    const deleteUserHandler = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/profile/${user["_id"]}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                //console.log("Successfully deleted account");
                setUser(null);
                navigate("/", {state: {message: "Successfully deleted account"}});
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            setMessage({
                text: error.message,
                class: "messageFailure",
            });
        }
    };

    const updatePasswordHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/v1/profile/${user["_id"]}/changepassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: userInput.password,
                    newPassword: userInput.newPassword
                })
            });
            if (response.status === 200) {
                const message = await response.json();

                setEditMode(!editMode);
                setMessage({
                    text: message.message,
                    class: "messageSuccess",
                });
            }
            else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            setMessage({
                text: error.message,
                class: "messageFailure",
            });
        }
    }

    const editModeHandler = () => {
        setEditMode(!editMode);
    };

    const cancelHandler = () => {
        setUserInput({
            userName: user.userName,
            email: user.email,
            password: user.password,
        });
        setEditMode(!editMode);
    };

    const inputChangeHandler = (event) => {
        setUserInput((prevUserInput) => {
            return {
                ...prevUserInput,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <main>
            <h2>Favorites:</h2>
            {!editMode && favMovies && <Movies movies={favMovies} />}
            {editMode ? (
                <>
                    <form onSubmit={updateUserHandler}>
                        <div className="formInputContainer">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                value={userInput.userName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="formInputContainer">
                            <label>E-mail:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={userInput.email}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <button>Save changes</button>
                        <button onClick={cancelHandler} type="button">
                            Cancel
                        </button>
                    </form>
                    <form onSubmit={updatePasswordHandler}>
                        <div className="formInputContainer">
                            <label>New password:</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={userInput.newPassword}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="formInputContainer">
                            <label>Old password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Old Password"
                                value={userInput.password}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <button>Change password</button>
                    </form>
                </>
            ) : (
                <button onClick={editModeHandler}>Edit data</button>
            )}
            <button onClick={deleteUserHandler}>Delete account</button>
        </main>
    );
}

export default ProfilePage;
