import React from 'react'
import SignIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const SignInAndSignUp = () => (
  <Row>
    <Col xs={12} sm={12} m={6} lg={6} className="mb-4">
      <SignIn/>
    </Col>
    <Col xs={12} sm={12} m={6} lg={6}>
      <SignUp />
    </Col>
  </Row>

);

export default SignInAndSignUp