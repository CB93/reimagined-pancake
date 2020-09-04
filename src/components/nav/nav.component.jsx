import React from 'react';
import Container from '../container/container.component';
import Logo from '../logo/logo.component';

import './nav.styles.scss'

const Nav = () => {
 return(
    <nav>
      <Container>
        <Logo></Logo>
      </Container>
    </nav>
  )
}

export default Nav