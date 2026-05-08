import React from 'react'
import { Modal } from 'react-bootstrap'
import noUser from '../../../../assets/images/user-img.jpg'

export default function UserData({ show, onClose, user, onDelete }) {
    const hasImage = !!user?.imagePath
    return (
        <div>
            <Modal show={show} onHide={onClose} centered animation={true}>
                <div className="card position-relative border-0 shadow-lg rounded- overflow-hidden">
                    {/* Image */}
                    <div className="py-4 text-center bg-success">
                        <div className="">
                            {hasImage
                                ?
                                <img
                                    src={`https://upskilling-egypt.com:3006/${user?.imagePath}`}
                                    alt={user?.name}
                                    className="object-fit-cover  rounded-circle "
                                    style={{ height: "220px", objectFit: "cover" }}
                                />
                                :
                                <img className=' object-fit-cover  rounded-circle' style={{ height: "150px", objectFit: "cover" }} src={noUser} alt={user?.name} />
                            }
                        </div>
                        <div className="text-white mt-2">
                            {/* Name */}
                            <h5 className="fw-bold mb-1">{user?.userName}</h5>
                            {/* Email */}
                            <p className=" text-light small mb-3">
                                {user?.email}
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
                                    <span>{user?.id}</span>
                                </div>
                            </div>
                            {/* Country */}
                            <div className="col-6">
                                <div className="bg-light rounded-3 p-2">
                                    <small className="text-muted d-block">COUNTRY</small>
                                    <span className="fw-semibold">
                                        {user?.country}
                                    </span>
                                </div>
                            </div>
                            {/* Phone Number */}
                            <div className="col-6">
                                <div className="bg-light rounded-3 p-2">
                                    <small className="text-muted d-block">PHONE NUMBER</small>
                                    <span className="fw-semibold">
                                        {user?.phoneNumber}
                                    </span>
                                </div>
                            </div>
                            {/* Date */}
                            <div className="col-6">
                                <div className="bg-light rounded-3 p-2">
                                    <small className="text-muted d-block">JOINED</small>
                                    <span>
                                        {new Date(user?.creationDate).toLocaleDateString('en-GB')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Buttons delete */}
                        <div className="d-flex">
                            <button className="btn btn-outline-danger fw-bolder w-100 rounded-3"
                                onClick={() => onDelete(user)} >
                                <i className="fa fa-trash-can me-2"></i>
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
