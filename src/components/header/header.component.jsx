import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.utils';

import './header.styles.scss'

const Header = ({ currentUser }) => {
  return (
    <div className='header'>
      <nav>
        <div className='header-options'>
          <Link to="/" className="logo">
            Spotify Dashboard<span>.</span>
          </Link>
          {
            currentUser ? (
              <div>
                <Link to="/dashboard" className="logo">
                  Spotify Dashboard<span>.</span>
                </Link>
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
              </div>
            ) : (
                null
              )

          }
        </div>
      </nav>
    </div>
  )
}




export default Header