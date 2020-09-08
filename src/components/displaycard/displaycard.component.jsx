import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { BsHeartFill, BsPlayFill } from "react-icons/bs";

import CardDeck from 'react-bootstrap/CardDeck'

import './displaycard.styles.scss'

const DisplayCard = (props) => {
  // console.log(props)
  return (
    <div className="carddeck-container">
      <CardDeck>
        {props.musicItems.map(musicItem => {
          return (
            <Card
              key={musicItem.id}
              className="card-content"
            >
              <Card.Img
                variant="top"
                width={100}
                height={140}
                src={musicItem.album.images[1].url}
              />
              <Card.Body>
                <Card.Title className="item-name">{musicItem.artists[0].name}</Card.Title>
                <Card.Text className="subname">{musicItem.name}</Card.Text>
              </Card.Body>
              <div>
                {props.isRecommendations 
                  ? <Button variant="light" onClick={() => props.isRecommendations(musicItem)}><BsHeartFill  color={'red'} /></Button>
                  : null
                }
                <Button variant="light" onClick={() => props.previewSong(musicItem)}><BsPlayFill size={'1.5em'}/></Button>
              </div>

            </Card>
          )
        })}
      </CardDeck>
    </div>
  )
}

export default DisplayCard