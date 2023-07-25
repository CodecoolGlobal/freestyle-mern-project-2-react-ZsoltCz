import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import ProfilePage from "./views/ProfilePage";
import MainPage from "./views/MainPage";
import MessageField from "./components/MessageField";
import MoviesPage from "./views/MoviesPage";
import MoviePage from "./views/MoviePage";

const APIKEY = import.meta.env.VITE_APIKEY;

function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/login"
                    element={
                        <LoginPage/>
                    }
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/profile"
                    element={
                        <ProfilePage
                            APIKEY={APIKEY}
                        />
                    }
                />
                <Route
                    path="/movies/"
                >
                    <Route
                        index={true}
                        path=""
                        element={
                            <MoviesPage
                                APIKEY={APIKEY}
                            />
                        }
                    />
                    <Route
                        path=":id"
                        element={<MoviePage />}
                    />
                </Route>
            </Routes>
            <MessageField />
        </>
    );
}

export default App;
