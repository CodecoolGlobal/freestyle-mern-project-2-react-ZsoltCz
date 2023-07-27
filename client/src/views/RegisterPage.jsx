import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/messageContext";

function RegisterPage() {
    const navigate = useNavigate();

    const { setMessage } = useContext(MessageContext);

    const [userInput, setUserInput] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInput),
                }
            );

            if (response.status === 200) {
                console.log("Success");
                navigate("/login", {
                    state: { message: "Successfully created account" },
                });
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            setMessage({
                class: "messageFailure",
                text: error.message,
            });
            console.error(error);
        }
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
            <form onSubmit={submitHandler}>
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
                <div className="formInputContainer">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userInput.password}
                        onChange={inputChangeHandler}
                    />
                </div>

                <button>Register</button>
            </form>
        </main>
    );
}

export default RegisterPage;
