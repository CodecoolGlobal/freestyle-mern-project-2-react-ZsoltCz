

const MessageField = ({ message }) => {


    return (
        <div className={message.class}>{message.text}</div>
    )
}

export default MessageField