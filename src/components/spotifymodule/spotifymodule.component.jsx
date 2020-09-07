
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import CardContainer from '../cardcontainer/cardcontainer.component';
import SelectionContainer from '../selectioncontainer/selectioncontainer.component';

import './spotifymodule.styles.scss';

import * as SpotifyFunctions from '../../spotifyFunctions';
import * as toastr from '../../toastconfig';

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
  // If there is 5 tracks in the array and they are trying to insert another track
  isSelected = (song) => {
    const { selectedSeeds } = this.state
    // Returns -1 if element does not exist
    const index = selectedSeeds.map(e => e.id).indexOf(song.id)

    if (selectedSeeds.length === 5 && index === -1) {
      toast.error("Only 5 seeds maximum allowed", toastr.Options)
    } else {
      index !== -1 ? selectedSeeds.splice(index, 1) : selectedSeeds.push({ ...song })
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

  addToLibrary = async (musicItem) => {
    const addedToLibrary = await SpotifyFunctions.addToLibrary(musicItem)
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
          </Container>
        </Col>
        <Col>
          {selectedSeeds.length ?
            <Container>
              <CardContainer
                cardcontent={selectedSeeds}
              />    
              <Button
                className="generate-seeds-btn"
                onClick={() => this.recommendationWithSeed()}
              >Generate Songs
            </Button>
            </Container>
            : null}
          {recommendedList.tracks ?
            <Container>
              <CardContainer
                cardcontent={recommendedList.tracks}
                isRecommendations={this.addToLibrary}
              />
            </Container>
            : null}
        </Col>
      </Row>
    )
  }
}

export default SpotifyModule;