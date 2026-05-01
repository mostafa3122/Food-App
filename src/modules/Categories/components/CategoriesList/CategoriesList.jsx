import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerMan from '../../../../assets/images/header-man.png'
import { DeleteCategory, GetCategories } from '../../../../api/modules/categories'
import NoData from '../../../Shared/components/NoData/NoData'
import noData from '../../../../assets/images/no-data.png'

// Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'

export default function CategoriesList() {

    const [categoriesList, setCategoriesList] = useState([])

    // Modal
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const getList = async (data) => {
        try {
            const response = await GetCategories(data)
            setCategoriesList(response.data.data);
        } catch (error) {
            toast.error("Something Went wrong")        }
    }
    const handleDeleteClick = (id) => {
        setSelectedId(id)
        setShowModal(true)
    }
    const deleteCategory = async (id) => {
        try {
            const response = await DeleteCategory(id)
            toast.success("Item Deleted Successfuly")
            getList()
            // setCategoriesList(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            toast.success("Something Went wrong")
        } finally {
            setShowModal(false)
            setSelectedId(null)
        }
    }
    useEffect(() => {
        getList()
    }, []);
    return (
        <>
            {/* header */}
            <Header title={<>Categories <span>Items</span></>}
                description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerMan}
            />

            <div className="container-fluid mt-4 ">
            {/* sub header */}
                <div className="row ">
                    <div className="col-md-8">

                        <h6 className='mb-0'>Categories Table Details</h6>
                        <p >You can check all details</p>
                    </div>

                    <div className="col-md-4 ">
                        <div className="d-flex justify-content-end">
                            <button className='btn bg-success rounded rounded-3  px-5 py-2 d-flex justify-content-center gap-2 text-decoration-none text-white align-items-center'>
                                Add New Item
                            </button>
                        </div>
                    </div>
                </div>
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
                    {/* <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button> */}
                    <Button variant="danger" onClick={() => deleteCategory(selectedId)}>
                        Delete this item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
