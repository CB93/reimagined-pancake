import React from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const DisplayCard = (props) => {
  console.log(props)
  return (
    <div className="recommendation-container">
      <CardDeck>
        {props.musicItems.map(element => {
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
  )
}

export default DisplayCard
