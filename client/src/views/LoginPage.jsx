import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { MessageContext } from "../context/messageContext";

function LoginPage() {

    const { setUser } = useContext(UserContext);
    
    const { setMessage } = useContext(MessageContext);
    
    const location = useLocation();
    
    const navigate = useNavigate();

    const registrationMessage = location?.state?.message;

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (registrationMessage) {
            setMessage({
                class: "messageSuccess",
                text: registrationMessage,
            });
        }
    }, [registrationMessage]);

    const loginHandler = async (event) => {
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
                setUser(user);
                navigate("/", {state: {message: "Successful login"}});
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            setMessage({
                class: "messageFailure",
                text: error.message,
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
