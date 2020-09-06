
import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import SeedContainer from '../seedcontainer/seedcontainer.component'
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

  constructor(props) {
    super(props)
    this.state = { ...moduleBuildState() }
  }

  // API calls to Spotify API onload
  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const fetchedUserInfo = await SpotifyFunctions.getUserInformation();
    const fetchedUserTracks = await SpotifyFunctions.getMyTopTracks(this.state.userTracksPageRef);

    this.setState({
      userInformation: fetchedUserInfo,
      userTracks: fetchedUserTracks
    });
  }

  // Gets either the next 20 set of tracks or the previous set of 20 tracks
  // Calls Spotify API function with new track offset
  getOtherTracks = async (is_next) => {
    const { userTracksPageRef } = this.state
    const newRef = is_next ? userTracksPageRef + 10 : userTracksPageRef - 10
    const userTracks = await SpotifyFunctions.getMyTopTracks(newRef);

    this.setState({
      userTracks: userTracks,
      userTracksPageRef: newRef
    })
  }

  // Selected Seeds for generated playlist / track
  isSelected = (id, albumURL) => {
    const { selectedSeeds } = this.state
    const index = selectedSeeds.map(e => e.id).indexOf(id)

    index != -1 ? selectedSeeds.splice(index, 1) : selectedSeeds.push({ id: id, url: albumURL })

    this.setState({
      selectedSeeds: selectedSeeds
    })
  }

  render() {
    const { userTracks, userTracksPageRef, selectedSeeds } = { ...this.state }
    console.log(this.state)
    return (
      <Row>
        <Col>

        </Col>
        <Col xs={3} m={3} lg={3} xl={3}>
          {selectedSeeds.length ?
            <SeedContainer seeds={selectedSeeds}></SeedContainer>
            : null}
          <Container>
            <Card className="favorite-card">
              <Card.Body>
                <ListGroup>
                  {userTracks ?
                    <div>
                      {userTracks.items.map((element) => (
                        <TrackCard
                          key={element.id}
                          select={this.isSelected}
                          track={element}>
                        </TrackCard>
                      ))}
                    </div>
                    : null}
                </ListGroup>
              </Card.Body>
            </Card>
            <div className="button-group">
              <Button
                onClick={() => this.getOtherTracks(false)}
                disabled={userTracksPageRef ? false : true}
              > Previous
              </Button>
              <Button
                onClick={() => this.getOtherTracks(true)}
                disabled={userTracksPageRef === 40 ? true : false}
              >Next</Button>
            </div>
            <Button>
              Generate Songs
            </Button>
          </Container>
        </Col>
      </Row>
    )
  }
}

export default SpotifyModule;