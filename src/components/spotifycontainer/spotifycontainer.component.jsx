import React from 'react';
import Paper from '@material-ui/core/Paper';
import ConnectSpotify from '../connectspotify/connectspotify.component';
import PlaylistChooser from '../playlistchooser/playlistchooser.component';
import * as SpotifyFunctions from '../../spotifyFunctions.js'

class SpotifyContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInToSpotify: false,
            accessToken: null
        }
    }

    componentDidMount(){
        // Checks URL when component mounts to see if there is an access token
        const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        accessToken ? this.setState({loggedInToSpotify: true, accessToken: accessToken}) : this.setState({loggedInToSpotify: false, accessToken: null});
    }

  render() {
    return (
      <div className="SpotifyContainer">
      <Paper>
        <p>Spotify Controls</p>
        {!this.state.loggedInToSpotify ? <ConnectSpotify /> : <PlaylistChooser accessToken={this.state.accessToken}/> }
        </Paper>
      </div>
    );
  }
}

export default SpotifyContainer;