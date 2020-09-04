import React from 'react';
import { Link } from 'react-router-dom';

import './logo.styles.scss'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      Caleb's Recipes<span>.</span>
    </Link>
  )
}

export default Logo;