
import React from 'react';
import ConnectSpotify from '../../components/connectspotify/connectspotify.component';
import SpotifyModule from '../../components/spotifymodule/spotifymodule.component';
import * as SpotifyFunctions from '../../spotifyFunctions.js'

import './homepage.styles.scss'

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInToSpotify: false,
      accessToken: null,
      userInformation: null
    }
  }

  // Checks URL when component mounts to see if there is an access token
  async componentDidMount() {
    const accessToken = await SpotifyFunctions.checkUrlForSpotifyAccessToken();
    await SpotifyFunctions.setAccessToken(accessToken);
    const fetchedUserInfo = await SpotifyFunctions.getUserInformation();
    accessToken ? this.setState({ loggedInToSpotify: true, accessToken: accessToken, userInformation: fetchedUserInfo }) : this.setState({ loggedInToSpotify: false, accessToken: null });
  }

  render() {
    const { loggedInToSpotify, userInformation, accessToken} = this.state
    return (
      <div>
        {!loggedInToSpotify ? 
                  <ConnectSpotify /> :

          <SpotifyModule accessToken={accessToken} userInformation={userInformation} />}
        
         </div>
    );
  }
}

export default HomePage;