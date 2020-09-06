import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const RecommendationContainer = (props) => {
  return (
    <Container>
      <Card className="favorite-card">
        <Card.Body>
          Hey
          {/* {props.seeds.map((element) => {
            return (
              <Figure
                key={element.id}
              >
                <Figure.Image
                  width={70}
                  height={70}
                  alt="70x70"
                  src={element.url}
                />
              </Figure>
            )
          })} */}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RecommendationContainer
