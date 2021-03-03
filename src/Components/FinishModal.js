import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function FinishModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Game Over
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your score is {props.score}!
            Tail length is {props.tail} Train again.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }