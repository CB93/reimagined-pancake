import React from 'react';
import ConnectSpotify from '../connectspotify/connectspotify.component';
import SpotifyModule from '../spotifymodule/spotifymodule.component';
import * as SpotifyFunctions from '../../spotifyFunctions.js'

class SpotifyContainer extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
          loggedInToSpotify: false,
          accessToken: null
      }
    }
    
    // Checks URL when component mounts to see if there is an access token
    componentDidMount(){
      const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
      accessToken ? this.setState({loggedInToSpotify: true, accessToken: accessToken}) : this.setState({loggedInToSpotify: false, accessToken: null});
    }

  render() {
    return (
      <div className="SpotifyContainer">
          {!this.state.loggedInToSpotify ? <ConnectSpotify /> : <SpotifyModule accessToken={this.state.accessToken}/> }
      </div>
    );
  }
}

export default SpotifyContainer;