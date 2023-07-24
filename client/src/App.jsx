import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import ProfilePage from "./views/ProfilePage";
import MainPage from "./views/MainPage";
import MessageField from "./components/MessageField";
import MoviesPage from "./views/MoviesPage";

const APIKEY = import.meta.env.VITE_APIKEY;

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, [pathname]);

  useEffect(() => {
    let timerId;
    if (message) {
      timerId = setTimeout(() => setMessage(null), 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [message]);

  return (
      <>
          <Navbar
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUser={setUser}
          />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                  path="/login"
                  element={
                      <LoginPage
                          setLoggedIn={setLoggedIn}
                          setUser={setUser}
                          setMessage={setMessage}
                      />
                  }
              />
              <Route
                  path="/register"
                  element={<RegisterPage setMessage={setMessage} />}
              />
              <Route
                  path="/profile"
                  element={
                      <ProfilePage
                          user={user}
                          message={message}
                          setMessage={setMessage}
                          setLoggedIn={setLoggedIn}
                          setUser={setUser}
                          APIKEY={APIKEY}
                      />
                  }
              />
              <Route
                  path="/movies"
                  element={
                      <MoviesPage
                          setUser={setUser}
                          user={user}
                          APIKEY={APIKEY}
                          setMessage={setMessage}
                      />
                  }
              />
          </Routes>
          {message && <MessageField message={message} />}
      </>
  );
}

export default App;
