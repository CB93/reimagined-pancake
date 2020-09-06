import React from 'react';
import Figure from 'react-bootstrap/Figure'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const SeedContainer = ( props ) => {
  return (
  <Container>
    <Card className="favorite-card">
      <Card.Body>
        {props.seeds.map((element) => {
           return (<Figure>
            <Figure.Image
              width={70}
              height={70}
              alt="70x70"
              src={element.url}
              />
              </Figure>
            )
          })}
  </Card.Body>
  </Card>
  </Container>
  )
}

export default SeedContainer
