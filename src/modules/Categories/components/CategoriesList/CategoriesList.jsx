import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateGategory, DeleteCategory, GetCategories, UpdateCategory } from '../../../../api/modules/categories'
import headerMan from '../../../../assets/images/header-man.png'
import TableHeader from '../../../Shared/TableHeader/TableHeader'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import Header from '../../../Shared/components/Header/Header'
import NoData from '../../../Shared/components/NoData/NoData'
import AddCategoryModal from '../AddCategoryModal/AddCategoryModal'
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal'

export default function CategoriesList() {

    const [categoriesList, setCategoriesList] = useState([])

    /* Get Categories */
    const getList = async (data) => {
        try {
            const response = await GetCategories(data)
            setCategoriesList(response.data.data);
        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    // Delete Modal
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClose = () => setShowModal(false); // bte2fel elmodal
    /* Handel delete click >and> open madal */
    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }
    /*  Delete Category  >and> close madal*/
    const deleteCategory = async () => {
        try {
            await DeleteCategory(selectedItem.id)
            toast.success(`${selectedItem.name} Deleted Successfuly`)
            handleClose()
            getList()
            // setCategoriesList(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            console.log(error)
            toast.error("Something Went wrong")
        }
    }
    /* Add Category Modal */
    const [showAddModal, setShowAddModal] = useState(false)
    const handleAddClose = () => setShowAddModal(false); // bte2fel elmodal

    /* Handel Add click >> open madal */
    const handleAddCategory = async (data) => {
        await addCategory(data)
    }

    /*  Add Category  >> close madal*/
    const addCategory = async (data) => {
        try {
            await CreateGategory(data)
            toast.success("Category Added Successfully")
            handleAddClose()
            getList()
        } catch (error) {
            console.log(error)
            toast.error("Something Went wrong")
        }
    }
     /* Edit Category Modal  */
    const [showEditModal, setShowEditModal] = useState(false)
    const handleEditClose = () => setShowEditModal(false)
    /* Handel Edit click >> open madal */
    const handleEditClick = (item) => {
        setSelectedItem(item)
        setShowEditModal(true)
    }
    /*  Edit Category  >> close madal*/
    const editCategory = async (data) => {
        try {
            await UpdateCategory(selectedItem.id, data)
            toast.success("Category Updated Successfully")
            handleEditClose()
            getList()
        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    /* Call Function */
    useEffect(() => {
        getList()
    }, []);
    return (
        <>
            {/* header */}
            <Header
                title={<>Categories <span>Items</span></>}
                description={<> You can now add your items that any user can order it from <br /> the Application and you can edit</>}
                imgUrl={headerMan}
            />

            <div className="container-fluid mt-4 ">
                {/* sub header */}
                {/* <TableHeader subHeaderTitle={"Categories"} onAddClick={() => setShowModal(true)} /> */}
                <TableHeader
                    subHeaderTitle={"Categories"}
                    onAddClick={() => setShowAddModal(true)}
                />

                <AddCategoryModal
                    show={showAddModal}
                    onClose={handleAddClose}
                    onConfirm={handleAddCategory}
                />
                {/* table data */}
                <div className="table-container">
                    {categoriesList.length > 0 ?
                        <table className="table custom-table   ">
                            <thead className='custom-head'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Creation Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoriesList.map(item => (
                                    <tr className='py-2 px-3' key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        {/* <td>{item.creationDate}</td> */}
                                        <td>{new Date(item?.creationDate).toLocaleDateString()}</td>
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
                                                        
                                                        <button onClick={() => handleEditClick(item)} className="dropdown-item">
                                                            <i className="fa fa-edit text-success me-2"></i>
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button onClick={() => handleDeleteClick(item)} className="dropdown-item">
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
            {/* modal for delet */}
            <DeleteConfirmation
                show={showModal}
                onClose={handleClose}
                onConfirm={deleteCategory}
                deleteItem={"Category"}
                itemName={selectedItem?.name}
            />
            {/* modal for edit */}
            <EditCategoryModal
                show={showEditModal}
                onClose={handleEditClose}
                onConfirm={editCategory}
                selectedItem={selectedItem}
            />
        </>
    )
}
