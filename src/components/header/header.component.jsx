import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss'

const Header = () => {
  return (
    <div className='header'>
      <nav>
        <div className='header-options'>
          <Link to="/" className="logo">
            Spotify Dashboard<span>.</span>
          </Link>
          {/* <div className='options'>
            <Link className='option' to='/sign-in'>
              SIGN IN
            </Link>
            <Link className='option' to='/profile'>
              PROFILE
            </Link>
          </div> */}
        </div>
      </nav>
    </div>
  )
}

export default Header