import React from 'react';
import { auth } from '../../firebase.utils'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };



  render() {
    const { email, password } = this.state

    return (
      <div className='sign-in'>
        <Row>
          <Col>
            <h2>I already have an account</h2>
            <p className="mb-3">Sign in with your email and password</p>
            <form onSubmit={this.handleSubmit}>
              <Form.Group>

                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  label='Email'
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                  label='Password'
                  required
                />
              </Form.Group>
              <div className='buttons'>
                <Button type='submit'> Sign in </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignIn;