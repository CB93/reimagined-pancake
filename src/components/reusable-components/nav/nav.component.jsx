import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../utils/firebase.utils';
import Nav from 'react-bootstrap/Nav'


import './nav.styles.scss'

const Header = ({ currentUser }) => {
  return (
    <div className='header'>
      <Nav>
        <div className='header-options'>
          <Link to='/' className='logo'>
            Spotify Dashboard<span>.</span>
          </Link>
          {
            currentUser ? (
              <div className='options'>
                <Link to='/dashboard' className='option'>
                  Dashboard
                </Link>
                <Link to='/' className='option' onClick={() => auth.signOut()}>
                  Sign Out
                </Link>
              </div>
            ) : (
                null
              )

          }
        </div>
        </Nav>
    </div>
  )
}




export default Header