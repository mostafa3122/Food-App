import React from 'react'
import { Modal } from 'react-bootstrap'

export default function CategoriesData({ show, onClose, category, onEdit, onDelete }) {
  return (
    <div>
      <Modal show={show} onHide={onClose} centered animation={true}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">
            Category Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div div className=' container-fluid'>
            <div className="row g-2 text-center mb-3  py-5 ">
              <div className="col-4">
                <h6>ID</h6>
                <p>{category?.id}</p>
              </div>
              <div className="col-4">
                <h6>Name</h6>
                <p>{category?.name}</p>
              </div>
              <div className="col-4">
                <h6>Date</h6>
                <p>{new Date(category?.creationDate).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-3">

              <button className="btn btn-outline-success"
                onClick={() => onEdit(category)}>
                <i className="fa fa-edit me-2"></i>
                Edit
              </button>

              <button className="btn btn-outline-danger"
                onClick={() => onDelete(category)} >
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
