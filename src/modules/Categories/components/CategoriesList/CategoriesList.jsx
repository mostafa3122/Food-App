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
import CategoriesData from '../CategoriesData/CategoriesData'
import PaginationComponent from '../../../Shared/components/Pagination/PaginationComponent'

export default function CategoriesList() {

    const [categoriesList, setCategoriesList] = useState([])


    /* Pagination */
    const [pageNumber, setPageNumber] = useState(1) // current page
    const [pageSize, setPageSize] = useState(5)  // number of elements in page
    const [totalPages, setTotalPages] = useState(0) // store total pages
    /* filtration */

    const [nameInput, setNameInput] = useState('')
    const [filters, setFilters] = useState({
        name: ''
    })
    /* Get Categories */
    const getList = async () => {
        try {
            const response = await GetCategories({
                pageNumber,
                pageSize,
                name: filters.name
            })
            setCategoriesList(response.data.data);
            // save total number of pages 
            setTotalPages(response.data.totalNumberOfPages)
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

    /* Veiw Category */
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleViewClick = (category) => {
        setSelectedCategory(category);
        setShowDetailsModal(true);
    };

    /* Call Function */
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({
                ...prev,
                name: nameInput
            }))
            setPageNumber(1)
        }, 500)

        return () => clearTimeout(timer)
    }, [nameInput])
    useEffect(() => {
        getList()
    }, [pageNumber, filters.name]);

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
                <div className="filtration my-2 py-2 ">
                    <div className="container-fluid">
                        <div className="row gap-3">
                            {/* search input */}
                            <div className="col-12 rounded">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Search by name..."
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                            </div>


                        </div>
                    </div>
                </div>
                <AddCategoryModal
                    show={showAddModal}
                    onClose={handleAddClose}
                    onConfirm={handleAddCategory}
                />
                {/* table data */}
                <div className="table-container table-responsive">
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
                                    <tr className='py-2 px-3' key={item?.id}>
                                        <th scope="row">{item?.id}</th>
                                        <td>{item?.name}</td>
                                        {/* <td>{item.creationDate}</td> */}
                                        {/* to make data as known >> d/m/y */}
                                        <td>{new Date(item?.creationDate).toLocaleDateString('en-GB')}</td>
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
                                                        <button onClick={() => handleViewClick(item)} className="dropdown-item">
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
                {/* pagination */}
                <PaginationComponent
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalPages={totalPages}
                />
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
            {/* View category */}
            <CategoriesData
                show={showDetailsModal}
                category={selectedCategory}
                onClose={() => setShowDetailsModal(false)}
                onEdit={(item) => {
                    setShowDetailsModal(false);
                    handleEditClick(item);
                }}
                onDelete={(item) => {
                    setShowDetailsModal(false);
                    handleDeleteClick(item);
                }}
            />
        </>
    )
}
