import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';


import TrackCard from '../trackcard/trackcard.component';

const SelectContainer = (props) => {

  return (
    <div>
      <Card className="favorite-card">
        <Card.Body>
          <ListGroup>
            {props.userTracks ?
              <div>
                {props.userTracks.items.map((element) => (
                  <TrackCard
                    key={element.id}
                    select={props.select}
                    track={element}>
                  </TrackCard>
                ))}
              </div>
              : null}
          </ListGroup>
        </Card.Body>
      </Card>
      <div className="button-group">
        <Button
          onClick={() => props.getOtherTracks(false)}
          disabled={props.userTracksPageRef ? false : true}
        > Previous
                </Button>
        <Button
          onClick={() => props.getOtherTracks(true)}
          disabled={props.userTracksPageRef === 40 ? true : false}
        >Next</Button>
      </div>
    </div>
  )
}

export default SelectContainer
