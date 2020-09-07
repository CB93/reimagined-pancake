import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import DisplayCard from '../displaycard/displaycard.component'
import './recommendationcontainer.styles.scss'

const RecommendationContainer = (props) => {
  console.log(props)
  return (
    <Container>
      <Card>
        <Card.Body>
          <DisplayCard 
            musicItems={props.recommendations}
          /> 
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RecommendationContainer