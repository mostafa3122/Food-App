import React from 'react'
import { Modal } from 'react-bootstrap';
import noRecipe from '../../../../assets/images/no-recipe.jpg'

import { useNavigate } from "react-router-dom";


export default function RecipeData({ show, onClose, recipe, onEdit, onDelete }) {

    return (
        <div>

            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-6 fw-bold">
                        Recipe Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                        {/* Image */}
                        <div className="position-relative text-center">
                            {recipe?.imagePath
                                ?
                                <img
                                    src={`https://upskilling-egypt.com:3006/${recipe?.imagePath}`}
                                    alt={recipe?.name}
                                    className="w-100"
                                    style={{ height: "220px", objectFit: "cover" }}
                                />
                                :
                                <img className=' object-fit-cover' style={{ height: "220px", objectFit: "cover" }} src={noRecipe} alt={recipe?.name} />
                            }


                            <span className="badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2">
                                {recipe?.tag?.name}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="card-body">

                            {/* Title */}
                            <h5 className="fw-bold mb-1">{recipe?.name}</h5>

                            {/* Description */}
                            <p className="text-muted small mb-3">
                                {recipe?.description}
                            </p>

                            {/* Info Grid */}
                            <div className="row g-2 text-center mb-3">

                                <div className="col-6">
                                    <div className="bg-light rounded-3 p-2">
                                        <small className="text-muted d-block">Price</small>
                                        <span className="fw-semibold text-success">
                                            {recipe?.price} EGP
                                        </span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="bg-light rounded-3 p-2">
                                        <small className="text-muted d-block">Category</small>
                                        <span className="fw-semibold">
                                            {recipe?.category?.[0]?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="bg-light rounded-3 p-2">
                                        <small className="text-muted d-block">ID</small>
                                        <span>{recipe?.id}</span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="bg-light rounded-3 p-2">
                                        <small className="text-muted d-block">Date</small>
                                        <span>
                                            {new Date(recipe?.creationDate).toLocaleDateString('en-GB')}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Buttons edit & delete */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-success w-50 rounded-3"
                                    onClick={() => onEdit(recipe)} >
                                    <i className="fa fa-edit me-2"></i>
                                    Edit
                                </button>

                                <button className="btn btn-outline-danger w-50 rounded-3"
                                    onClick={() => onDelete(recipe)} >
                                    <i className="fa fa-trash-can me-2"></i>
                                    Delete
                                </button>

                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
