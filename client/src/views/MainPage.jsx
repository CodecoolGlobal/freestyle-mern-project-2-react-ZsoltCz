import React, { useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageContext } from '../context/messageContext';

function MainPage() {

  const location = useLocation();

  const { setMessage } = useContext(MessageContext);

  console.log(location)

  const message = location?.state?.message;
  
  useEffect(() => {
    if (message) {
      setMessage({
        text: message,
        class: "messageSuccess"
      })
    }
  }, [message]
  )

  return (
      <main>
          <h1>Welcome to our media site!</h1>
          <Link className='mainPageLink' to='/movies'>Search movies and series here!</Link>
      </main>
  );
}

export default MainPage