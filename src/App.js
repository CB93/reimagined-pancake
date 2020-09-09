import React from "react";
import Header from './components/dashboard/header/header.component';
import HomePage from './pages/dashboard/dashboard.component';
import Login from './pages/login/login.component';
import PrivateRoute from './routes/privateroute.component'

import { auth, createUserProfileDocument } from './utils/firebase.utils';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscriberFromAuth = null;

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          this.props.history.push('/dashboard')


        })


      }
      this.setState({ currentUser: userAuth })
    })
  }

  render() {
    const { currentUser } = this.state
    return (
      <div>
        <ToastContainer />
        <Header currentUser={currentUser} />
        <div className="app-container">
          <Switch>
            <PrivateRoute currentUser={this.state.currentUser} exact={true} path="/dashboard" component={HomePage} />
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
