import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerMan from '../../../../assets/images/header-man.png'
import { DeleteRecipe, GetRecipes } from '../../../../api/modules/recipes'
import NoData from '../../../Shared/components/NoData/NoData'
// Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import noRecipe from '../../../../assets/images/no-recipe.jpg'
import { Link } from 'react-router-dom'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import TableHeader from '../../../Shared/TableHeader/TableHeader'

// import NoData from '../../../Shared/components/NoData/NoData'

export default function RecipesList() {
    const [recipesList, setRecipesList] = useState([])

    // Modal
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClose = () => setShowModal(false);
    const getRecipes = async (data) => {
        try {
            const response = await GetRecipes(data)
            setRecipesList(response.data.data)

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }
    const deleteRecipe = async () => {
        try {
            const response = await DeleteRecipe(selectedItem.id)
            toast.success(`${selectedItem.name} Deleted Successfuly`)
            handleClose()
            getRecipes()

        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    useEffect(() => {
        getRecipes()
    }, []);
    return (
        <>
            <Header
                title={<>Recipes <span>Items</span></>}
                description={<>You can now add your items that any user can order it from <br /> the Application and you can edit</>} imgUrl={headerMan}
                imgClassName={""} />

            <div className="container-fluid mt-4 ">
                <TableHeader subHeaderTitle={"Recipes"} subHeaderPath={"/dashboard/recipe-data"} />
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
                                            {item.imagePath ?
                                             <img className='table-image' src={`https://upskilling-egypt.com:3006/${item?.imagePath}`} alt={item?.name} />
                                              :
                                            <img className='table-image' src={noRecipe} alt={item?.name}/>
                                              }
                                            
                                        </td>
                                        <td>{item?.price}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.tag?.name}</td>
                                        <td>{item?.category[0]?.name}</td>
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
                                                            <i className="fa fa-eye text-success me-2"></i>
                                                            View
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="fa fa-edit text-success me-2"></i>
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button onClick={() => { handleDeleteClick(item) }} className="dropdown-item">
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
            {/* modal */}
            <DeleteConfirmation
                show={showModal}
                onClose={handleClose}
                onConfirm={deleteRecipe}
                deleteItem={"Recipe"}

                itemName={selectedItem?.name}
            />
        </>
    )
}
