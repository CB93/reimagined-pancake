import React from 'react'
import SignIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const SignInAndSignUp = () => (
  <Row>
    <Col>
      <SignIn/>
    </Col>
    <Col>
      <SignUp />
    </Col>
  </Row>

);

export default SignInAndSignUp