import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import CardDeck from 'react-bootstrap/CardDeck'

import './displaycard.styles.scss'

const DisplayCard = (props) => {
  // console.log(props)
  return (
    <div className="recommendation-container">
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
                <Card.Title>{musicItem.artists[0].name}</Card.Title>
                <Card.Text>{musicItem.name}</Card.Text>
              </Card.Body>
              {props.isRecommendations ?
                <div>
                  <Button variant="light" onClick={() => props.isRecommendations(musicItem)}>Add to library</Button>
                </div>
                :
                null
              }
            </Card>
          )
        })}
      </CardDeck>
    </div>
  )
}

export default DisplayCard