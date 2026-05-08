import React from 'react'
import { Modal } from 'react-bootstrap'
import CategoryImg from '../../../../assets/images/category-img.png'

export default function CategoriesData({ show, onClose, category, onEdit, onDelete }) {
  return (
    <Modal show={show} onHide={onClose} centered animation={true}>
      <div className="card position-relative border-0 shadow-lg rounde-2 overflow-hidden">
        <div className="py-4 text-center bg-success">
          <div className="">

            <img className=' object-fit-cover  rounded-circle' style={{ height: "220px", objectFit: "cover" }} src={CategoryImg} alt={category?.name} />

          </div>
          <div className="text-white mt-2">
            {/* Name */}
            <h5 className="fw-bold mb-1">{category?.name}</h5>
            {/* Email */}
            <p className=" text-light small mb-3">
              {category?.email}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.25)', border: 'none', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '0.8rem', backdropFilter: 'blur(4px)',
          }}
        >
          <i className="fa fa-times" />
        </button>

        {/* Content */}
        <div className="card-body">
          {/* Card Grid */}
          <div className="row g-2 text-center mb-3">
            {/* ID */}
            <div className="col-6">
              <div className="bg-light rounded-3 p-2">
                <small className="text-muted d-block">ID</small>
                <span>{category?.id}</span>
              </div>
            </div>
            {/* Country */}
            <div className="col-6">
              <div className="bg-light rounded-3 p-2">
                <small className="text-muted d-block">NAME</small>
                <span className="fw-semibold">
                  {category?.name}
                </span>
              </div>
            </div>
            {/* Date */}
            <div className="col-6">
              <div className="bg-light rounded-3 p-2">
                <small className="text-muted d-block">CREATED AT</small>
                <span>
                  {new Date(category?.creationDate).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </div>
          {/* Buttons delete */}
          <div className="d-flex gap-2">
            <button className="btn btn-success w-50 rounded-3"
              onClick={() => onEdit(category)} >
              <i className="fa fa-edit me-2"></i>
              Edit
            </button>
            <button className="btn btn-outline-danger fw-bolder w-50 rounded-3"
              onClick={() => onDelete(category)} >
              <i className="fa fa-trash-can me-2"></i>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
