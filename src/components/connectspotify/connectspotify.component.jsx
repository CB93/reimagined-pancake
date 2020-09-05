import React from 'react';
import * as SpotifyFunctions from '../../spotifyFunctions.js'

class ConnectSpotify extends React.Component {

  render() {
    return (
      <div className="ConnectSpotify">
        <a href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
            <button>Connect to Spotify</button>
        </a>
      </div>
    );
  }
}

export default ConnectSpotify;