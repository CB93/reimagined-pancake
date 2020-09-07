import React from 'react';
import Card from 'react-bootstrap/Card'
import DisplayCard from '../displaycard/displaycard.component'
import './cardcontainer.styles.scss'

const CardContainer = (props) => {
  return (
    <Card>
      <Card.Body>
        <DisplayCard 
          musicItems={props.cardcontent}
          isRecommendations={props.isRecommendations}
        /> 
      </Card.Body>
    </Card>
  )
}

export default CardContainer