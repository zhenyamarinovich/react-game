import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function LastTenScore(props) {
    const numbers = props.tenScore;
    const listItems = numbers.map((number,index) =>
      <li key={index}>
          Score: {number}
      </li> 
    );
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Last Ten Score
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ol>{listItems}</ol>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }