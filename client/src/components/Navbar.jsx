import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ loggedIn, setLoggedIn, setUser }) {
    const navigate = useNavigate();

    const logoutHandler = () => {
        setLoggedIn(false);
        navigate("/login");
        setUser(null);
    };

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link className="navbarItem" to="/">
                                Main page
                            </Link>
                        </li>
                        <li>
                            <Link className="navbarItem" to="/movies">
                                Movies
                            </Link>
                        </li>
                        {loggedIn ? (
                            <>
                                <li>
                                    <Link className="navbarItem" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="navbarItem"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className="navbarItem" to="/login">
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link className="navbarItem" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}
