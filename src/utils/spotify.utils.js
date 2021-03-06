//spotifyFunctions.js
import { toast } from 'react-toastify';

import * as toastr from './toastconfig.utils';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export function redirectUrlToSpotifyForLogin() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI ? process.env.REACT_APP_REDIRECT_URI : 'http://localhost:3000/dashboard';

  const scopes = [
    "user-library-read",
    "user-library-modify",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-top-read"
  ];

  return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&scope=' + encodeURIComponent(scopes.join(' ')) +
    '&response_type=token';
}


export function checkUrlForSpotifyAccessToken() {
  const params = getHashParams();
  const accessToken = params.access_token
  if (!accessToken) {
    return false
  } else {
    return accessToken
  }
}

//Parses query string that spotify sends back after redirection
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  // eslint-disable-next-line
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}


export function setAccessToken(accessToken) {
  spotifyApi.setAccessToken(accessToken);
}

// Calls API, gets authorized user's personal information
export async function getUserInformation() {
  try {
    const userInformation = await spotifyApi.getMe()
    return userInformation
  } catch (err) {
    console.error('Error getting users account information', err);
  }
}

// Calls API, gets authorized user's saved tracks
export async function getMyTopTracks(offset, duration) {
  const time_range = duration ? duration : 'long_term'
  const options = { time_range: time_range, limit: 10 + offset, offset: offset }
  console.log(options)
  try {
    const savedTracks = await spotifyApi.getMyTopTracks(options)
    return savedTracks
  } catch (err) {
    console.error('Error getting users saved track information', err);
  }
}

// Call API, gets rsecommendations based on users seeds
export async function getRecommendations(seeds) {
  const filterSeeds = seeds.map(value => value.id);
  const options = { seed_tracks: filterSeeds }

  try {
    const recommendedTracks = await spotifyApi.getRecommendations(options)
    return recommendedTracks
  } catch (err) {
    console.log('Error getting recommendations from seeds', err)
  }
}

export async function addToLibrary(musicItem) {
  try {
    const alreadyHas = await spotifyApi.containsMySavedTracks([musicItem.id])
    
    if (alreadyHas[0]) {
      return toast.error(`Oops, ${musicItem.name} is already in your library`, toastr.defaultOptions)
    } else {
      await spotifyApi.addToMySavedTracks([musicItem.id])
      return toast.success(`${musicItem.name} - was added to your library`, toastr.defaultOptions)
    }

  } catch (err) {
    return toast.error(`${err}`, toastr.defaultOptions)
  }
}