import React from 'react'
import { Modal } from 'react-bootstrap'

export default function UserData({ show, onClose, user, onDelete }) {
    return (
        <div>
            <Modal show={show} onHide={onClose} centered animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-6 fw-bold">
                        User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div div className=' container-fluid'>
                        <div className="row g-2 text-center mb-3  py-5 ">
                            <div className="col-4">
                                <h6>ID</h6>
                                <p>{user?.id}</p>
                            </div>
                            <div className="col-4">
                                <h6>Name</h6>
                                <p>{user?.userName}</p>
                            </div>
                            <div className="col-4">
                                <h6>Phone Number</h6>
                                <p>{user?.phoneNumber}</p>
                            </div>

                            <div className="col-4">
                                <h6>Date</h6>
                                <p>{new Date(user?.creationDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div className="col-4">
                                <h6>Email</h6>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <button className="btn btn-outline-danger"
                                onClick={() => onDelete(user)} >
                                <i className="fa fa-trash-can me-2"></i>
                                Delete
                            </button>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
