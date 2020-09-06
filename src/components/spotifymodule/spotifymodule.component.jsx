
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
  userInformation: null,
  userTracks: null,
  userTracksPageRef: 0,
  selectedSeeds: []
});

class SpotifyModule extends React.Component {

  constructor(props){
    super(props)
    this.state = { ...moduleBuildState() }
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const fetchedUserInfo = await SpotifyFunctions.getUserInformation();
    const fetchedUserTracks = await SpotifyFunctions.getMySavedTracks(this.state.userTracksPageRef);
    
    this.setState({
      userInformation: fetchedUserInfo,
      userTracks: fetchedUserTracks
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

  isSelected = (id) => {
    const { selectedSeeds } = this.state
    selectedSeeds.push(id)

    this.setState ({
      selectedSeeds : selectedSeeds
    })
  }




render() {
    const { userTracks, userTracksPageRef } = {...this.state}
    console.log(this.state)

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
                      {userTracks.items.map((element) => (
                        <TrackCard
                          key={element.track.id}
                          select={this.isSelected} 
                          track={element.track}>
                        </TrackCard>
                        ))}
                    </div>
                  : null }
                </ListGroup>
              </Card.Body>
            </Card>
            <div className="button-group">
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