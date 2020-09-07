import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import DisplayCard from '../displaycard/displaycard.component'
import './cardcontainer.styles.scss'

const CardContainer = (props) => {
  console.log(props)
  return (
    <Container>
      <Card>
        <Card.Body>
          <DisplayCard 
            musicItems={props.cardcontent}
          /> 
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CardContainer