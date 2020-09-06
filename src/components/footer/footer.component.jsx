import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <nav>
        <Link to="/" className="logo">
          Spotify Dashboard<span>.</span>
        </Link>
      </nav>
    </div>
  )
}

export default Footer