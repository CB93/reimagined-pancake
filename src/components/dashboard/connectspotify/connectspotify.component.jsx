import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import * as SpotifyFunctions from '../../../utils/spotify.utils.js'
import { FaSpotify } from "react-icons/fa";

import './connectspotify.styles.scss'

class ConnectSpotify extends React.Component {

  render() {
    return (
      <div className="ConnectSpotify">
        <Jumbotron>
          <h1>Hello, welcome to your own very Spotify Dashboard </h1>
          <p>Use this app to generate recommendations based on your most played songs on Spotify!</p>
          <p>Start By Connecting to Spotify</p>
          <a className="mt-2" href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
            <Button className="badge-pill btn-success">Connect to Spotify <FaSpotify /></Button>
          </a>
        </Jumbotron>

      </div>
    );
  }
}

export default ConnectSpotify;