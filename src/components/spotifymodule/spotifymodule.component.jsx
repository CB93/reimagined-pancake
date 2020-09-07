
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import RecommendationContainer from '../recommendationcontainer/recommendationcontainer.component';
import SeedContainer from '../seedcontainer/seedcontainer.component';
import SelectionContainer from '../selectioncontainer/selectioncontainer.component';

import './spotifymodule.styles.scss'

import * as SpotifyFunctions from '../../spotifyFunctions'

const moduleBuildState = () => ({
  userInformation: null,
  userTracks: null,
  userTracksPageRef: 0,
  selectedSeeds: [],
  recommendedList: []
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
    // Returns -1 if element does not exist
    const index = selectedSeeds.map(e => e.id).indexOf(id)

    // If there is 5 tracks in the array and they are trying to insert another track
    if (selectedSeeds.length === 5 && index === -1) {
      alert("There is a maximum of 5 tracks allowed")
    } else {
      index !== -1 ? selectedSeeds.splice(index, 1) : selectedSeeds.push({ id: id, url: albumURL })
    }

    this.setState({
      selectedSeeds: selectedSeeds
    })
  }

  recommendationWithSeed = async () => {
    const { selectedSeeds } = this.state
    const recommendations = await SpotifyFunctions.getRecommendations(selectedSeeds);

    this.setState({
      recommendedList: recommendations
    })
  }

  render() {
    const { userTracks, userTracksPageRef, selectedSeeds, recommendedList } = { ...this.state }
    // console.log(this.state)
    return (
      <Row>
        <Col xs={3} m={3} lg={3} xl={3}>
          <Container>
            {userTracks ?
              <SelectionContainer
                userTracks={userTracks}
                select={this.isSelected}
                getOtherTracks={this.getOtherTracks}
                userTracksPageRef={userTracksPageRef}
              />
              : null}

            {selectedSeeds.length ?
              <Button
                onClick={() => this.recommendationWithSeed()}
              >
                Generate Songs
              </Button>
              : null}
          </Container>
        </Col>
        <Col>
          {selectedSeeds.length ?
            <SeedContainer
              seeds={selectedSeeds}
            />
            : null}
          {recommendedList.tracks ?
            <RecommendationContainer
              recommendations={recommendedList.tracks}
            />
            : null}
        </Col>
      </Row>
    )
  }
}

export default SpotifyModule;