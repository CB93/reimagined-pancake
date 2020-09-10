
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { toast } from 'react-toastify';

import CardContainer from '../cardcontainer/cardcontainer.component';
import SelectionContainer from '../selectioncontainer/selectioncontainer.component';

import './spotifymodule.styles.scss';

import * as SpotifyFunctions from '../../../utils/spotify.utils';
import * as toastr from '../../../utils/toastconfig.utils';

const moduleBuildState = () => ({
  userTracksPageRef: 0,
  selectedSeeds: [],
  recommendedList: [],
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
    const fetchedUserTracks = await SpotifyFunctions.getMyTopTracks(this.state.userTracksPageRef);
    this.setState({
      userTracks: fetchedUserTracks
    });
  }


  // Calls Spotify API, causes selection container to render with track duration
  getMyTopTracks = async (key) => {
    const fetchedUserTracks = await SpotifyFunctions.getMyTopTracks(0, key);
    this.setState({
      userTracks: fetchedUserTracks,
      userTracksPageRef: 0
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
    this.setState({ recommendedList: recommendations })
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
        toastr.previewOptions.autoClose = event.srcElement.duration * 1000
        toast.success(`Now Playing: ${musicItem.name}`, toastr.previewOptions)
      }
    } else {
      this.audioPlayer.pause()
      toast.dismiss();
      toast.error("Sorry, no preview available for this song", toastr.defaultOptions)
    }
    toast.clearWaitingQueue();
  }



  render() {
    const { userTracks, userTracksPageRef, selectedSeeds, recommendedList } = { ...this.state }
    const { userInformation } = this.props
    console.log(userInformation)
    return (

      <Row>
        <Col xs={3} m={3} lg={3} xl={3}>
          <Container>
            <h4>Top 50 Tracks</h4>

            {userTracks ?
              <div>
                <Tabs defaultActiveKey={'long_term'} transition={false} onSelect={this.getMyTopTracks}>
                  <Tab eventKey={'long_term'} title="All-time" />
                  <Tab eventKey={'medium_term'} title="6 Months" />
                  <Tab eventKey={'short_term'} title="4 Weeks" />
                </Tabs>
                <SelectionContainer
                  userTracks={userTracks}
                  select={this.isSelected}
                  getOtherTracks={this.getOtherTracks}
                  userTracksPageRef={userTracksPageRef}
                />
              </div>
              : null}
          </Container>
        </Col>
        <Col>
          <Container>
            <h4>Seeds</h4>

            {selectedSeeds.length ?
              <div>
                <CardContainer
                  isSeed={true}
                  cardcontent={selectedSeeds}
                  previewSong={this.previewSong}
                  deselect={this.isSelected}
                />
                <Button
                  className="generate-seeds-btn badge-pill"
                  onClick={() => this.recommendationWithSeed()}
                > {recommendedList.tracks ? 'Generate More Recommendations'
                  : 'Generate Recommendations'}
                </Button>
              </div>
              : <Jumbotron>
                <h1>Hello, {userInformation.display_name}</h1>
                <p>
                  This is a simple app, Start by picking a few songs from the left side of your
                  top tracks.
                </p>
                <p>Click the generate recommendations button after.</p>
              </Jumbotron>
            }
          </Container>

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