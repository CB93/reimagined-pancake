import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss'

const Footer = () => {
 return(
    <div className='footer'>
      <nav>
        <Link to="/" className="logo">
          Caleb's Recipes<span>.</span>
        </Link>    
      </nav>
    </div>

  )
}

export default Footer