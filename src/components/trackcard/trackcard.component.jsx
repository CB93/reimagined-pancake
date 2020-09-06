import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Figure from 'react-bootstrap/Figure'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './trackcard.styles.scss'

const TrackCard = ( props ) => {
  return (
    <ListGroup.Item onClick={() => props.select(props.track.id)}>
      <Row>
        <Col xs={8} m={8} lg={8} xl={8}>
          <p className='artist-name'>{props.track.artists[0].name}</p>
          <p className='track-name'>{props.track.name}</p>
        </Col>
        <Col>
        <Figure>
          <Figure.Image
            width={70}
            height={70}
            alt="70x70"
            src={props.track.album.images[1].url}
          />
        </Figure>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default TrackCard