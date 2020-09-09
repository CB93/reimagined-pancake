import  React from  "react";
import { Route, withRouter } from  "react-router-dom";
import { auth } from '../utils/firebase.utils';


class PrivateRoute extends React.Component {
  componentDidMount() {
    this.listener = auth.onAuthStateChanged(
      authUser => {
        if (!authUser) {
          this.props.history.push('/');
        }
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  
  // const condition = performValidationHere();
  render (){
    return <Route  path={this.props.path}  component={this.props.component} />
  }
 
};
export  default  withRouter(PrivateRoute);


