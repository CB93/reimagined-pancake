//spotifyFunctions.js
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export function redirectUrlToSpotifyForLogin() {
  const CLIENT_ID = '3acfac59619b4af3b219a4ff0c1547fa';
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI ? process.env.REACT_APP_REDIRECT_URI : 'http://localhost:3000';

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
  console.log(params)
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
  }
  catch (err) {
    console.error('Error getting users account information', err);
  }
}

// Calls API, gets authorized user's saved tracks
export async function getMyTopTracks(offset) {

  const options = { time_range: 'long_term', limit: 10 + offset, offset: offset }
  console.log(options)
  try {
    const savedTracks = await spotifyApi.getMyTopTracks(options)
    return savedTracks
  }
  catch (err) {
    console.error('Error getting users saved track information', err);
  }
}