import React from 'react';
import { Link } from 'react-router-dom';

import './nav.styles.scss'

const Nav = () => {
 return(
    <nav>
      <div className='header'>
        <Link to="/" className="logo">
         Caleb's Recipes<span>.</span>
        </Link>    
        <div className='options'>
          <Link className='option' to='/sign-in'>
            SIGN IN
          </Link>
          <Link className='option' to='/profile'>
            PROFILE
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav