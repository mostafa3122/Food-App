import React, { useEffect, useState } from 'react'
import headerMan from '../../../../assets/images/header-man.png'
import Header from '../../../Shared/components/Header/Header'
import favRecipe from '../../../../assets/images/category-img.png'
import PaginationComponent from '../../../Shared/components/Pagination/PaginationComponent';
import { DeleteFavourite, GetFavourites } from '../../../../api/modules/favourites';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import noRecipe from '../../../../assets/images/no-recipe.jpg'

export default function FavList() {
  const [favList, setfavList] = useState([]);  
  /* Get Favs */
  // const hasImage = !!fav?.recipe?.imagePath
  const getFavs = async () => {
    try {
      const response = await GetFavourites()
      console.log(response);
      setfavList(response?.data?.data);
    } catch (error) {
      toast.error("Something Went wrong")
    }
  }
  // delete from fav
  const deleteFav = async (id) => {
    try {
      await DeleteFavourite(id)
      toast.success("Removed from Favourites!")
      getFavs()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  /* Call Function */
  useEffect(() => {
    getFavs()
  }, []);

  return (
    <>
      <Header
        title={<>Recipes <span>Items</span></>}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl={headerMan}
      />
      {/* favourites content */}
      {favList.length > 0 ?
        <div className="container-fluid">
          <div className="row justify-content-center ">
            {favList.map(fav => (
              <div key={fav?.id} className=" col-md-4 p-2">
                <div className="card border-0 shadow-lg rounded- overflow-hidden">



                  {/* Image */}
                  <div className="position-relative text-center bg-success">
                    {fav?.recipe?.imagePath
                      ?
                      <img
                        src={`https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`}
                        alt={fav?.recipe?.name}
                        className="w-100"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      :
                      <img className=' object-fit-fill w-100' style={{ height: "220px", objectFit: "cover" }} src={noRecipe} alt={fav?.recipe?.name} />
                    }


                    <span className="badge bg-success position-absolute top-0 start-0 m-2 px-3 py-2">
                      {fav?.recipe?.tag?.name}
                    </span>
                    <div className="text-white mt-2 bg-success">
                      {/* Name */}
                      <h5 className="fw-bold mb-1">{fav?.recipe?.name}</h5>
                      {/* Email */}
                      <p className=" text-light small mb-3">
                        {fav?.recipe?.description}
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
                            {fav?.recipe?.price} EGP
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">Category</small>
                          <span className="fw-semibold">
                            {fav?.recipe?.category?.[0]?.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">ID</small>
                          <span>{fav?.recipe?.id}</span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">Date</small>
                          <span>
                            {new Date(fav?.recipe?.creationDate).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>

                    </div>
                    <button
                      onClick={() => deleteFav(fav?.id)}
                      className="btn btn-outline-danger w-100 rounded-3"
                    >
                      <i className="fa fa-heart-broken me-2"></i>
                      Remove from Favourites
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        :
        <NoData />}

    </>
  )
}
