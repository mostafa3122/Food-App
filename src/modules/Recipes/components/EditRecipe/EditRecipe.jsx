import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UpdateRecipe } from '../../../../api/modules/recipes'
import { GetCategories } from '../../../../api/modules/categories'
import { GetTags } from '../../../../api/modules/tags'
import { toast } from 'react-toastify'
import SubHeader from '../../../Shared/SubHeader/SubHeader'



/** the flow for editing recipe
 * 1. send recipe item from RecipesList in btn edit by using router state  in navigate
 * 2. get id from url
 * 3. get recipe data from state using step 1
 * 4. get categoris and tags functions (api)
 * 5. use defaultValues option/key in useForm for setting the values of inputs
 * 6. image not a string in api so i didnot put it in its input bt i handled it
 * 7. use formData to append new data 
 * 8. check if use select image or not 
 * 9. if not use the current image
 * 
 * 00. handle update  function (api)
 */
export default function EditRecipe() {
    const navigate = useNavigate()

    // get id from url 
    const { id } = useParams()
    // get recipe data using location and state
    const location = useLocation()
    const recipeToEdit = location.state
    //get categories & tags
    const [categoriesList, setCategoriesList] = useState([])
    const [tagsList, setTagsList] = useState([])
    // get categories 
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
    // useForm 
    const { register, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm({
        //    fill form with old data
        defaultValues: {
            name: recipeToEdit?.name,
            price: recipeToEdit?.price,
            tagId: recipeToEdit?.tag?.id,
            categoriesIds: recipeToEdit?.category[0]?.id,
            description: recipeToEdit?.description,
        }
    })
    // use formData to append new data >> main use for input file
    const appendToFormData = async (data) => {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("tagId", data.tagId)
        formData.append("categoriesIds", data.categoriesIds)
        formData.append("description", data.description)
        // if user choose image >> upload it 
        if (data.recipeImage && data.recipeImage.length > 0) {
            // new image
            formData.append("recipeImage", data.recipeImage[0])
        }
        // if user don't choose image 
        // we need to return the current image without updating it
        // convert path image from string to file (download it)
        // then add it for form 
        else {
            // api not accepted string path
            // formData.append("recipeImage", recipeToEdit?.imagePath) 
            // fetch old image from server 
            const response = await fetch(`https://upskilling-egypt.com:3006/${recipeToEdit?.imagePath}`)
            const blob = await response.blob()
            // convert old image to file image
            const file = new File([blob], "recipeImage.jpg", { type: blob.type })
            // append as a new image
            formData.append("recipeImage", file)
        }
        return formData
    }
    // handle update recipe 
    const onSubmit = async (data) => {
        let recipeData = await appendToFormData(data)
        try {
            await UpdateRecipe(id, recipeData)
            toast.success("Recipe Updated Successfully")
            navigate('/dashboard/recipes')
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }
    // call functions
    useEffect(() => {
        const getData = async () => {
            await getCategories()
            await getTags()
            setValue("categoriesIds", recipeToEdit?.category[0]?.id)
            setValue("tagId", recipeToEdit?.tag?.id)
        }
        getData()
    }, [])
    return (
        <>
            <SubHeader
                subTitle={"Edit The"}
                subDescription={<>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</>}
                btnText={"All Recipes"}
                btnUrl={"/dashboard/recipes"}
            />
            <div className="form my-3 w-75 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name */}
                    <div className="mb-3">
                        <input {...register("name", {
                            required: "Recipe name is Required",
                            minLength: { value: 3, message: "Recipe name must be at least 3 characters" }
                        })} className="py-2 px-3 form-control" type="text" placeholder="Recipe Name" />
                    </div>
                    {errors?.name && <span className='text-danger'>{errors?.name?.message}</span>}

                    {/* Tags */}
                    <div className="mb-3">
                        <select {...register("tagId", { required: "Tag is Required" })} className="py-2 px-3 form-select">
                            <option value="">Tags</option>
                            {tagsList.map(tag => (
                                <option key={tag?.id} value={tag?.id}>{tag?.name}</option>
                            ))}
                        </select>
                    </div>
                    {errors?.tagId && <span className='text-danger'>{errors?.tagId?.message}</span>}

                    {/* Price */}
                    <div className="mb-3">
                        <input {...register("price", {
                            required: "Price is Required",
                            min: { value: 1, message: "Price must be greater than 0" }
                        })} className="py-2 px-3 form-control" type="number" placeholder='Price' />
                    </div>
                    {errors?.price && <span className='text-danger'>{errors?.price?.message}</span>}

                    {/* Category */}
                    <div className="mb-3">
                        <select {...register("categoriesIds", { required: "Category is Required" })} className="py-2 px-3 form-select">
                            <option value="">Category</option>
                            {categoriesList.map(category => (
                                <option key={category?.id} value={category?.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    {errors?.categoriesIds && <span className='text-danger'>{errors?.categoriesIds?.message}</span>}

                    {/* Description */}
                    <div className="mb-3">
                        <textarea {...register("description", {
                            required: "Field is Required",
                            minLength: { value: 10, message: "Description must be at least 10 characters" },
                            maxLength: { value: 500, message: "Description must not exceed 500 characters" }
                        })} className="py-2 px-3 form-control" placeholder='Description' rows={3} />
                    </div>
                    {errors?.description && <span className='text-danger'>{errors?.description?.message}</span>}

                    {/* Recipe Image */}
                    <div className='mb-3'>
                        <input type="file" id="fileInput" className="d-none"
                            {...register("recipeImage")} accept="image/*" />
                        <label htmlFor="fileInput" className="btn py-4 fs-6 d-flex flex-column input-file align-items-center gap-2" style={{ cursor: 'pointer', width: 'fit-content' }}>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            <span>Drag & Drop or <span className='text-success fw-bolder'>Choose a Item Image</span> to Upload</span>
                        </label>
                    </div>
                    <div className="w-25 rounded-5">
                        <img src={`https://upskilling-egypt.com:3006/${recipeToEdit?.imagePath}`} alt="recipe" className='img-fluid rounded-4' />
                    </div>

                    <div className="mb-3 d-flex justify-content-end">
                        <button onClick={() => navigate('/dashboard/recipes')} type="button" className='btn px-4 py-2 btn-outline-success mx-3'>Cancel</button>
                        <button type="submit" className='btn px-3 btn-success'>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}