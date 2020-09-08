
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
  userTracksPageRef: 0,
  selectedSeeds: [],
  recommendedList: [],
  userInformation: null,
  userTracks: null
});



class SpotifyModule extends React.Component {
  // Audio constructor for browers native audio
  audioPlayer = new Audio()

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
    const index = selectedSeeds.map(e => e.id).indexOf(song.id) // Returns -1 if element does not exist

    if (selectedSeeds.length === 5 && index === -1) {
      toast.error("Only 5 seeds maximum allowed", toastr.defaultOptions)
    } else {
      index !== -1 ? selectedSeeds.splice(index, 1) : selectedSeeds.push({ ...song })
    }

    this.setState({
      selectedSeeds: selectedSeeds
    })
  }

  //Sends request with seeds to Spotify API, returns recommendations
  recommendationWithSeed = async () => {
    const { selectedSeeds } = this.state
    const recommendations = await SpotifyFunctions.getRecommendations(selectedSeeds);
    this.setState({ recommendedList: recommendations})
  }

  // Button listener to add song to library
  addToLibrary = async (musicItem) => {
    await SpotifyFunctions.addToLibrary(musicItem)
  }

  previewSong = (musicItem) => {

    if (musicItem.preview_url) {
      toast.dismiss();
      this.audioPlayer.src = musicItem.preview_url; 
      this.audioPlayer.play()
      this.audioPlayer.onloadeddata = (event) => {
        toast.success(`Now Playing: ${musicItem.name}` , {autoClose : event.srcElement.duration * 1000})
      }
    } else {
      this.audioPlayer.pause()
      toast.dismiss();
      toast.error("Sorry, no preview available for this song", toastr.defaultOptions)
    }
    toast.clearWaitingQueue();
  }

 

  render() {
    const { userTracks, playing, userTracksPageRef, selectedSeeds, recommendedList } = { ...this.state }

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
                previewSong={this.previewSong}
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
                previewSong={this.previewSong}
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