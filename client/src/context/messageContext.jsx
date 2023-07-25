import { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {

    const [message, setMessage] = useState(null);
    console.log(message)
    return <MessageContext.Provider value={{message: message, setMessage: setMessage}}>{children}</MessageContext.Provider>;
}

export default MessageContextProvider;