//PlaylistChooser.js

import React from 'react';
import * as SpotifyFunctions from '../../spotifyFunctions'

class PlaylistChooser extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
  }


render() {
    return (
      <div>hey</div>
    )
  }
}
  
export default PlaylistChooser;