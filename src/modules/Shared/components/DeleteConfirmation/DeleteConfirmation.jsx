// import { Modal } from 'bootstrap'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import noData from '../../../../assets/images/no-data.png'

export default function DeleteConfirmation({ show, onClose , onConfirm ,deleteItem,itemName }) {
   
    return (
        <div className='delete-confirm'>
            <Modal show={show} onHide={onClose} >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className='text-center'>
                    <img src={noData} alt="noData" />
                    <h5 className='fw-bold'>Delete this {deleteItem} ?</h5>
                    <p>Are you sure you want to delete <span className='fw-bolder'>{itemName}</span> ? if you are sure just click on delete it</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onConfirm}>
                        Delete this item
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
