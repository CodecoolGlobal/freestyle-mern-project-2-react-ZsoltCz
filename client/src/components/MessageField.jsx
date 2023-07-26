import { MessageContext } from "../context/messageContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from 'react-dom';

const MessageField = () => {

    const {message, setMessage} = useContext(MessageContext);

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

    return createPortal(message && <div className={message.class}>{message.text}</div>, document.getElementById("message"));
}

export default MessageField