import React from 'react';
import Card from 'react-bootstrap/Card'
import Figure from 'react-bootstrap/Figure'

import Container from 'react-bootstrap/Container'

const DisplayCard = (props) => {
  console.log(props)
  return (
    <Container>
      <Card>
        <Card.Body>
          {props.recommendations.tracks.map(element => {
            return (
              <Figure
                key={element.id}
              >
                <Figure.Image
                  width={70}
                  height={70}
                  alt="70x70"
                  src={element.album.images[2].url}
                />
              </Figure>
            )
          })} 
        </Card.Body>
      </Card>
    </Container>
  )
}

export default DisplayCard
