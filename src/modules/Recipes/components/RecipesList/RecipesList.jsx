import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerMan from '../../../../assets/images/header-man.png'
import { DeleteRecipe, GetRecipes } from '../../../../api/modules/recipes'
import NoData from '../../../Shared/components/NoData/NoData'
// Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import noData from '../../../../assets/images/no-data.png'

// import NoData from '../../../Shared/components/NoData/NoData'

export default function RecipesList() {
    const [recipesList, setRecipesList] = useState([])

    // Modal
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const getRecipes = async (data) => {
        try {
            const response = await GetRecipes(data)
            setRecipesList(response.data.data)

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const handleDeleteClick = (id) => {
        setSelectedId(id)
        setShowModal(true)
    }
    const deleteRecipe = async (id) => {
        try {
            const response = await DeleteRecipe(id)
            toast.success("Item Deleted Successfuly")
            getRecipes()
            
        } catch (error) {
            toast.success("Something Went wrong")
        } finally {
            setShowModal(false)
            setSelectedId(null)
        }
    }
    useEffect(() => {
        getRecipes()
    }, []);
    return (
        <>
            <Header title={<>Recipes <span>Items</span></>}
                description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerMan}
                imgClassName={""} />

            <div className="container-fluid mt-4 ">
                <div className="row ">
                    <div className="col-md-8">

                        <h6 className='mb-0'>Recipe Table Details</h6>
                        <p>You can check all details</p>
                    </div>
                    <div className="col-md-4 ">
                        <div className="d-flex justify-content-end">
                            <button className='btn bg-success rounded rounded-3  px-5 py-2 d-flex justify-content-center gap-2 text-decoration-none text-white align-items-center'>
                                Add New Item
                            </button>
                        </div>
                    </div>
                    {/* table data */}
                    <div className="table-container">
                        {recipesList.length > 0 ?
                            <table className="table custom-table  table-striped  ">
                                <thead className='custom-head'>
                                    <tr>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Tag</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipesList.map(item => (
                                        <tr className='py-2 px-3' key={item.id}>
                                            <td scope="row">{item?.name}</td>
                                            <td>
                                                <img className='table-image' src={`https://upskilling-egypt.com:3006/${item.imagePath}`} alt={item?.name} />
                                            </td>
                                            <td>{item?.price}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.tag?.name}</td>
                                            <td>{item?.category.length > 0
                                                ? item.category.map(cat => cat.name).join(", ")
                                                : "No Category"}</td>
                                            <td>
                                                <div className="dropdown ">
                                                    <button
                                                        className="btn action-btn"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i className="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <ul className="dropdown-menu shadow border-0 rounded-4">
                                                        <li>
                                                            <button className="dropdown-item">
                                                                <i className="fa fa-edit text-success me-2"></i>
                                                                Edit
                                                            </button>
                                                        </li>

                                                        <li>
                                                            <button onClick={() => { handleDeleteClick(item.id) }} className="dropdown-item">
                                                                <i className="fa fa-trash-can text-success me-2"></i>
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <NoData />}

                    </div>
                </div>
            </div>
            {/* modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <img src={noData} alt="noData" />
                    <h5 className='fw-bold'>Delete This Item ?</h5>
                    <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                </Modal.Body>
                <Modal.Footer>
                  
                    <Button variant="danger" onClick={() => deleteRecipe(selectedId)}>
                        Delete this item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
