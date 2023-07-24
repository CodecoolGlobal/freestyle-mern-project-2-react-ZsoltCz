import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
      <main>
          <h1>Welcome to our movie site!</h1>
          <Link className='mainPageLink' to='/movies'>Search movies here!</Link>
      </main>
  );
}

export default MainPage