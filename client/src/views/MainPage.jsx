import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
      <main>
          <h1>Welcome to our media site!</h1>
          <Link className='mainPageLink' to='/movies'>Search movies and series here!</Link>
      </main>
  );
}

export default MainPage