import React from 'react';
import { auth } from '../../../utils/firebase.utils';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

import * as toastr from '../../../utils/toastconfig.utils';


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
    } catch (error) {
      toast.error(error.message, toastr.defaultOptions)
    }
  };

  handleChange = event => {
    event.preventDefault()
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  getValidationState() {
    var value = this.state.value;

    if (value===null || value==='') { return null; }

    var valid = this._getValidity(value)
    if (valid===true) {
      return 'success';
    } else {
      return 'error';
    }
}



  render() {
    const { email, password } = this.state

    return (
      <div className='sign-in'>
        <Row>
          <Col>
            <h2>I already have an account</h2>
            <p className="mb-3">Sign in with your email and password</p>
            <form  onSubmit={this.handleSubmit}>
              <Form.Group>
              
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  label='Email'
                  required
                />
              </Form.Group>

              <Form.Group >
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
                <Button type='submit'> Sign in </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignIn;