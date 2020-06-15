import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function EditButton(props) {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faEdit} />
    </Button>
  )
}


function DeleteButton(props) {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </Button>
  )
}

function LeftButton(props) {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </Button>
  )
}

function RightButton(props) {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faAngleRight} />
    </Button>
  )
}


export {
  EditButton,
  DeleteButton,
  LeftButton,
  RightButton,
};
