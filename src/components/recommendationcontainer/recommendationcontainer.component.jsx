import React from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'

import './recommendationcontainer.styles.scss'

const RecommendationContainer = (props) => {
  console.log(props)
  return (
    <Container>
      <Card>
        <Card.Body>
          <div className="recommendation-container">
            <CardDeck>
              {props.recommendations.tracks.map(element => {
                return (
                  <Card>
                    <Card.Img 
                      variant="top"   
                      width={100}
                      height={140} 
                      src={element.album.images[1].url} 
                    />
                    <Card.Body>
                      <Card.Title>{element.artists[0].name}</Card.Title>
                      <Card.Text>{element.name}</Card.Text>
                    </Card.Body>
                  </Card>
                )
              })}
            </CardDeck>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RecommendationContainer