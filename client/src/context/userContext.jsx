import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    console.log(user)
    return <UserContext.Provider value={{user: user, setUser: setUser}}>{children}</UserContext.Provider>;
}

export default UserContextProvider;