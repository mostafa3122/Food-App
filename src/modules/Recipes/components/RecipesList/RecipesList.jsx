import React, { useContext, useEffect, useState } from 'react'
import { DeleteRecipe, GetRecipes } from '../../../../api/modules/recipes'
import headerMan from '../../../../assets/images/header-man.png'
import Header from '../../../Shared/components/Header/Header'
import NoData from '../../../Shared/components/NoData/NoData'
// Modal
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GetCategories } from '../../../../api/modules/categories'
import { GetFavourites } from '../../../../api/modules/favourites'
import { GetTags } from '../../../../api/modules/tags'
import noRecipe from '../../../../assets/images/no-recipe.jpg'
import { AuthContext } from '../../../../context/AuthContext'
import TableHeader from '../../../Shared/TableHeader/TableHeader'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'
import PaginationComponent from '../../../Shared/components/Pagination/PaginationComponent'
import RecipeData from '../RecipeData/RecipeData'

// import NoData from '../../../Shared/components/NoData/NoData'

export default function RecipesList() {
    const { loginData } = useContext(AuthContext)
    const [favIds, setFavIds] = useState(new Set())
    const navigate = useNavigate()
    const [recipesList, setRecipesList] = useState([])
    /* Pagination */
    const [pageNumber, setPageNumber] = useState(1) // current page
    const [pageSize] = useState(5)  // number of elements in page
    const [totalPages, setTotalPages] = useState(0) // store total pages
    // Modal
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClose = () => setShowModal(false);
    // filtration 
    // get categories 
    //get categories & tags
    const [nameInput, setNameInput] = useState('') 
    const [categoriesList, setCategoriesList] = useState([])
    const [tagsList, setTagsList] = useState([])
    const [filters, setFilters] = useState({
        name: '',
        categoryId: '',
        tagId: ''
    })
    const getCategories = async () => {
        try {
            const response = await GetCategories()
            setCategoriesList(response?.data?.data)
        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    // get Tags
    const getTags = async () => {
        try {
            const response = await GetTags()
            setTagsList(response?.data)
        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    // get recipes
    const getRecipes = async () => {
        try {
            const response = await GetRecipes({
                pageNumber,
                pageSize,
                name: filters.name,
                categoryId: filters.categoryId,
                tagId: filters.tagId,
            })
            setRecipesList(response?.data?.data)
            // save total number of pages 
            setTotalPages(response?.data?.totalNumberOfPages)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const getFavIds = async () => {
        try {
            const response = await GetFavourites({ pageNumber: 1, pageSize: 100 })
            const ids = new Set(
                response?.data?.data?.map(fav => fav?.recipe?.id)
            )
            setFavIds(ids)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }
    const deleteRecipe = async () => {
        try {
            await DeleteRecipe(selectedItem.id)
            toast.success(`${selectedItem.name} Deleted Successfuly`)
            handleClose()
            getRecipes()

        } catch (error) {
            toast.error("Something Went wrong")
        }
    }

    // view
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleViewClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowDetailsModal(true);
    };

    const handleEditFromView = (recipe) => {
        navigate(`/dashboard/edit-recipe/${recipe.id}`, {
            state: recipe
        });
    };
    const handleSelectFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        if (pageNumber !== 1) setPageNumber(1)
    }
    useEffect(() => {
        getCategories()
        getTags()
        getFavIds()
    }, [])

  
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, name: nameInput }))
            if (pageNumber !== 1) setPageNumber(1)
        }, 500)
        return () => clearTimeout(timer)
    }, [nameInput])

    useEffect(() => {
        getRecipes()
    }, [pageNumber, filters])

   
    // useEffect(() => {
    //     getRecipes()
    //     getFavIds()
    //     getCategories()
    //     getTags()
    // }, [pageNumber, filters.name, filters.categoryId, filters.tagId]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         getRecipes()
    //     }, 500)

    //     return () => clearTimeout(timer) 
    // }, [nameInput])
    return (
        <>
            <Header
                title={<>Recipes <span>Items</span></>}
                description={<>You can now add your items that any user can order it from <br /> the Application and you can edit</>} imgUrl={headerMan}
                imgClassName={""} />
            <div className="container-fluid mt-4 ">
                <TableHeader subHeaderTitle={"Recipes"} subHeaderPath={"/dashboard/add-recipe"} />
                <div className="filtration my-2 py-2 ">
                    <div className="container-fluid">
                        <div className="row gap-3">
                            {/* search input */}
                            <div className="col-md-7 rounded">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Search by name..."
                                    value={filters.name}
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, name: e.target.value }))
                                        setPageNumber(1)
                                    }}
                                />
                            </div>
                            {/* tags selet */}
                            <div className="col-md-2 rounded">
                                <select className="py-2 px-3 form-select"
                                    value={filters.tagId}
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, tagId: e.target.value }))
                                        setPageNumber(1)
                                    }}>
                                    <option value="">Tag</option>
                                    {tagsList.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Category select */}
                            <div className="col-md-2 rounded">
                                <select className="py-2 px-3 form-select"
                                    value={filters.categoryId}
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, categoryId: e.target.value }))
                                        setPageNumber(1)
                                    }}
                                >
                                    <option value="">Category</option>
                                    {categoriesList.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                {/* table data */}
                <div className="table-container table-responsive">
                    {recipesList.length > 0 ?
                        <table className="table custom-table  table-striped    ">
                            <thead className='custom-head'>
                                <tr>
                                    <th scope="col">ID</th>
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
                                        <td scope="row">{item?.id}</td>
                                        <td scope="row">{item?.name}</td>
                                        <td>
                                            {item.imagePath ?
                                                <img className='table-image' src={`https://upskilling-egypt.com:3006/${item?.imagePath}`} alt={item?.name} />
                                                :
                                                <img className='table-image' src={noRecipe} alt={item?.name} />
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
                                                    data-bs-toggle="dropdown" >
                                                    <i className="fa-solid fa-ellipsis"></i>
                                                </button>
                                                <ul className="dropdown-menu shadow border-0 rounded-4">
                                                    <li>
                                                        <button onClick={() => handleViewClick(item)} className="dropdown-item">
                                                            <i className="fa fa-eye text-success me-2"></i>
                                                            View
                                                        </button>
                                                    </li>
                                                    {loginData?.userGroup == "SuperAdmin"
                                                        ?
                                                        <>
                                                            <li>
                                                                {/* use router state to send item for using in edit  */}
                                                                <button onClick={() => navigate(`/dashboard/edit-recipe/${item.id}`, { state: item })} className="dropdown-item">
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
                                                        </>
                                                        : <></>
                                                    }
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
            {/* modal */}
            <DeleteConfirmation
                show={showModal}
                onClose={handleClose}
                onConfirm={deleteRecipe}
                deleteItem={"Recipe"}
                itemName={selectedItem?.name}
            />
            <RecipeData
                show={showDetailsModal}
                recipe={selectedRecipe}
                onClose={() => setShowDetailsModal(false)}
                onEdit={(item) => {
                    setShowDetailsModal(false);
                    handleEditFromView(item);
                }}
                onDelete={(item) => {
                    setShowDetailsModal(false);
                    handleDeleteClick(item);
                }}
                favIds={favIds}
                onFavAdded={(id) => setFavIds(prev => new Set([...prev, id]))}
            />
        </>
    )
}
