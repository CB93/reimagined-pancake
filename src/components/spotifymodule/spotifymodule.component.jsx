
import React from 'react';
import Card from 'react-bootstrap/Card'

import TrackCard from '../trackcard/trackcard.component';

import * as SpotifyFunctions from '../../spotifyFunctions'

class SpotifyModule extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      playlists: null,
      userTracks: null
    }
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const playlists = await SpotifyFunctions.getUserInformation();
    const userTracks = await SpotifyFunctions.getMySavedTracks();
    
    this.setState({
      playlists: playlists,
      userTracks: userTracks
    });
  }




render() {
    const { userTracks } = {...this.state}
    console.log(userTracks)
    return (
      <Card>
          <Card.Body>
        <div>
          {userTracks ?
            <div>
              {userTracks.items.map((person, index) => (
                 <TrackCard></TrackCard>
                 ))}
            </div>
          : null }
        </div>
        </Card.Body>
        </Card>
      
    )
  }
}
  
export default SpotifyModule;