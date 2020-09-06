
import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import TrackCard from '../trackcard/trackcard.component';

import './spotifymodule.styles.scss'




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
      <Row>
        <Col>

      </Col>
      <Col xs={3} m={3} lg={3} xl={3}>

      <Container>
      <Card className="favorite-card">
        <Card.Body>
          <ListGroup>
            {userTracks ?
              <div>
                {userTracks.items.map((track, index) => (
                  <TrackCard track={track.track}></TrackCard>
                  ))}
              </div>
            : null }
          </ListGroup>
        </Card.Body>
      </Card>
      </Container>
      </Col>

      </Row>
    )
  }
}
  
export default SpotifyModule;