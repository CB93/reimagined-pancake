import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss'

const Footer = () => {
 return(
    <nav>
      <div className='header'>
        <Link to="/" className="logo">
         Caleb's Recipes<span>.</span>
        </Link>    
      </div>
    </nav>
  )
}

export default Footer