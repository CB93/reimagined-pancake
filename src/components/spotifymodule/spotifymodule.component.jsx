
import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import TrackCard from '../trackcard/trackcard.component';

import './spotifymodule.styles.scss'

import * as SpotifyFunctions from '../../spotifyFunctions'

const moduleBuildState = () => ({
  userTracks: null,
  userTracksPageRef: 0
});

class SpotifyModule extends React.Component {

  constructor(props){
    super(props)
    this.state = { ...moduleBuildState() }
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const playlists = await SpotifyFunctions.getUserInformation();
    const userTracks = await SpotifyFunctions.getMySavedTracks(this.state.userTracksPageRef);
    
    this.setState({
      playlists: playlists,
      userTracks: userTracks
    });
  }

  getOtherTracks = async (is_next) => {
    const { userTracksPageRef } = this.state
    const newRef = is_next ? userTracksPageRef + 20 : userTracksPageRef - 20 
    const userTracks = await SpotifyFunctions.getMySavedTracks(newRef);
    
    this.setState ({
      userTracks: userTracks,
      userTracksPageRef: newRef
    })
  }

  isSelected = () => {

  }




render() {
    const { userTracks, userTracksPageRef } = {...this.state}
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
            <div class="button-group">
              <Button
                onClick={() => this.getOtherTracks(false)}
                disabled={userTracksPageRef ? false : true}
              > Previous
              </Button>
              <Button onClick={() => this.getOtherTracks(true)}>Next</Button>
            </div>
          </Container>
        </Col>
      </Row>
    )
  }
}
  
export default SpotifyModule;