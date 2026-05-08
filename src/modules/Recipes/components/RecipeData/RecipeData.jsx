import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import noRecipe from '../../../../assets/images/no-recipe.jpg';

import { toast } from 'react-toastify';
import { CreateFavourite } from '../../../../api/modules/favourites';
import { AuthContext } from '../../../../context/AuthContext';


export default function RecipeData({ show, onClose, recipe, onEdit, onDelete, favIds = new Set(), onFavAdded }) {
    const hasImage = !!recipe?.imagePath

    const isFav = favIds.has(recipe?.id)

    const { loginData } = useContext(AuthContext)
    const handleFavClick = async () => {

        if (isFav) {
            toast.info("Already in Favourites!")
            return
        }
        try {
         await CreateFavourite({ recipeId: recipe?.id })
            onFavAdded(recipe?.id)
            toast.success("Added to Favourites!")
        } catch (error) {
       
            toast.error("Something went wrong")
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Image */}
                <div className="position-relative text-center bg-success">
                    {hasImage
                        ?
                        <img
                            src={`https://upskilling-egypt.com:3006/${recipe?.imagePath}`}
                            alt={recipe?.name}
                            className="w-100"
                            style={{ height: "220px", objectFit: "cover" }}
                        />
                        :
                        <img className=' object-fit-fill w-100' style={{ height: "220px", objectFit: "cover" }} src={noRecipe} alt={recipe?.name} />
                    }


                    <span className="badge bg-success position-absolute top-0 start-0 m-2 px-3 py-2">
                        {recipe?.tag?.name}
                    </span>
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
                    <div className="text-white mt-2 bg-success">
                        {/* Name */}
                        <h5 className="fw-bold mb-1">{recipe?.name}</h5>
                        {/* Email */}
                        <p className=" text-light small mb-3">
                            {recipe?.description}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="card-body">

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
                    {loginData?.userGroup === "SystemUser"

                        ? <button

                            onClick={handleFavClick}
                            className="btn btn-outline-success w-100 rounded-3"
                        >
                            <i className="fa fa-heart me-2"></i>
                            Add to Favourites
                        </button>
                        :
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
                    }

                </div>
            </div>
        </Modal>
    )
}
