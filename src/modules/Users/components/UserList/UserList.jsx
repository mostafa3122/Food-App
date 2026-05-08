import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DeletUsersById, GetUsers } from '../../../../api/modules/users'
import headerMan from '../../../../assets/images/header-man.png'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import Header from '../../../Shared/components/Header/Header'
import NoData from '../../../Shared/components/NoData/NoData'
import UserData from '../UserData/UserData'
import PaginationComponent from '../../../Shared/components/Pagination/PaginationComponent'
import noUser from '../../../../assets/images/user-img.jpg'

export default function UserList() {
    const [usersList, setUsersList] = useState([])
    /* Pagination */
    const [pageNumber, setPageNumber] = useState(1) // current page
    const [pageSize, setPageSize] = useState(5)  // number of elements in page
    const [totalPages, setTotalPages] = useState(0) // store total pages
    const [nameInput, setNameInput] = useState('')
    const [filters, setFilters] = useState({
        userName: ''
    })
    /* Get Users */
    const getUsers = async () => {
        try {
            const response = await GetUsers({
                pageNumber,
                pageSize,
                userName: filters.userName
            })
            setUsersList(response.data.data);
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
    /*  Delete User  >and> close madal*/
    const deleteUser = async () => {
        try {
            await DeletUsersById(selectedItem.id)
            toast.success(`${selectedItem.userName} Deleted Successfuly`)
            handleClose()
            getUsers()

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    /* Veiw Category */
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({
                ...prev,
                userName: nameInput
            }))
            setPageNumber(1)
        }, 500)

        return () => clearTimeout(timer)
    }, [nameInput])
    useEffect(() => {
        getUsers()
    }, [pageNumber, filters.userName]);
    return (
        <div>
            <Header title={<>Users <span>List</span></>}
                description={<>You can now add your items that any user can order it from <br /> the Application and you can edit</>}
                imgUrl={headerMan}
            />
            {/* table header */}
            <div className="container-fluid">
                <div className="row  justify-content-center align-items-center  justify-content-md-start py-3">
                    <div className="col-12 col-md-7  mb-2 mb-md-0">
                        <h6 className='mb-0'>Users Table Details</h6>
                        <p>You can check all details</p>
                    </div>
                </div>
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
            </div>

            {/* table data */}
            <div className="table-container table-responsive">
                {usersList.length > 0 ?
                    <table className="table custom-table   ">
                        <thead className='custom-head'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Image</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map(item => (
                                <tr className='py-2 px-3' key={item?.id}>
                                    <th scope="row">{item?.id}</th>
                                    <td>{item?.imagePath
                                        ?
                                        <img
                                            src={`https://upskilling-egypt.com:3006/${item?.imagePath}`}
                                            alt={item?.name}
                                            className=" table-image  "
                                          
                                        />
                                        :
                                        <img className=' object-fit-cover table-image' src={noUser} alt={item?.name} />
                                    }</td>
                                    <td>{item?.userName}</td>
                                    <td>{item?.email}</td>
                                    {/* <td>{item.creationDate}</td> */}
                                    <td>{new Date(item?.creationDate).toLocaleDateString('en-GB')}</td>
                                    <td>{item?.phoneNumber}</td>
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
            <DeleteConfirmation
                show={showModal}
                onClose={handleClose}
                onConfirm={deleteUser}
                deleteItem={"User"}
                itemName={selectedItem?.userName}
            />
            <UserData
                show={showDetailsModal}
                user={selectedUser}
                onClose={() => setShowDetailsModal(false)}
                onDelete={(item) => {
                    setShowDetailsModal(false);
                    handleDeleteClick(item);
                }}
            />

        </div>
    )
}
