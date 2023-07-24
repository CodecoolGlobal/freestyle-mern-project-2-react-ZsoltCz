import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setLoggedIn, setUser, setMessage }) {
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const loginHandler = async (event) => {
        console.log(userInput);
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput),
            });

            if (response.status === 200) {
                const user = await response.json();
                setLoggedIn(true);
                setUser(user);
                navigate("/");
                setMessage({
                    class: "messageSuccess",
                    text: "Successful login",
                });
            } else if (response.status === 401) {
                setMessage({
                    class: "messageFailure",
                    text: "Incorrect password",
                });
            } else if (response.status === 404) {
                setMessage({
                    class: "messageFailure",
                    text: "User not found",
                });
            }
        } catch (error) {
            console.error(error);
            setMessage({
                class: "messageFailure",
                text: "An error has occured",
            });
        }
    };

    const inputChangeHandler = (event) => {
        //console.log(event)
        setUserInput((prevUserInput) => {
            return {
                ...prevUserInput,
                [event.target.type]: event.target.value,
            };
        });
    };

    return (
        <main>
            <form onSubmit={loginHandler}>
                <div className="formInputContainer">
                    <label>E-mail:</label>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={userInput.email}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="formInputContainer">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={userInput.password}
                        onChange={inputChangeHandler}
                    />
                </div>
                <button>Log in</button>
            </form>
        </main>
    );
}

export default LoginPage;
