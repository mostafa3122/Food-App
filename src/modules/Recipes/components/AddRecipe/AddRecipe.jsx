import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SubHeader from '../../../Shared/SubHeader/SubHeader'
import { useForm } from 'react-hook-form'
import { CreateRecipe } from '../../../../api/modules/recipes'
import { GetCategories } from '../../../../api/modules/categories'
import { GetTags } from '../../../../api/modules/tags'
import { toast } from 'react-toastify'

export default function AddRecipe() {

    const { register, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [categoriesList, setCategoriesList] = useState([])
    const [tagsList, setTagsList] = useState([])
    /* Get Categories */
    const getCategories = async (data) => {
        try {
            const response = await GetCategories(data)
            setCategoriesList(response?.data?.data);

        } catch (error) {
            toast.error("Something Went wrong")
        }
    }
    /* Get Tags */
    const getTags = async () => {
        try {
            const response = await GetTags()
            setTagsList(response?.data);
        } catch (error) {
            toast.error("Something Went wrong")
        }
    }

    const appendToFormData = (data) => {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("tagId", data.tagId)
        formData.append("categoriesIds", data.categoriesIds)
        formData.append("description", data.description)
        formData.append("recipeImage", data.recipeImage[0])
        return formData;
    }


    /* Handle Add Recipe */
    const onSubmit = async (data) => {
        let recipeData = appendToFormData(data)
        try {

            await CreateRecipe(recipeData)
            reset()
            toast.success("Recipe Added successful");
            navigate('/dashboard/recipes')
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    useEffect(() => {
        getCategories()
        getTags()
    }, []);
    return (
        <>
            <SubHeader
                subTitle={"Fill The"}
                subDescription={<>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</>}
                btnText={"All Recipes"}
                btnUrl={"/dashboard/Recipes"}
            />
            <div className="form my-3 w-75 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name */}
                    <div className="mb-3">
                        <input {...register("name", {
                            required: "Recipe name is Required",
                            minLength: {
                                value: 3,
                                message: "Recipe name must be at least 3 characters"
                            }
                        })} className="py-2 px-3 form-control" type="text" placeholder="Recipe Name" aria-label="Recipe Name" />
                    </div>
                    {errors?.name && <span className='text-danger'>{errors?.name?.message}</span>}
                    {/* Tags */}
                    <div className=" mb-3">
                        <select {...register("tagId", { required: "Tag is Required" })} className="py-2 px-3 form-select" aria-label="Default select example">
                            <option value="">Tags</option>
                            {tagsList.map(tag => (
                                <option key={tag?.id} value={tag?.id}>
                                    {tag?.name}
                                </option>

                            ))}
                        </select>
                    </div>
                    {errors?.tagId && <span className='text-danger'>{errors?.tagId?.message}</span>}
                    {/* Price */}
                    <div className="mb-3">
                        <input {...register("price", {
                            required: "Price is Required",
                            min: {
                                value: 1,
                                message: "Price must be greater than 0"
                            }
                        })} className="py-2 px-3 form-control" type="number" placeholder='Price' />
                    </div>
                    {errors?.price && <span className='text-danger'>{errors?.price?.message}</span>}
                    {/* Category ID  */}
                    <div className=" mb-3">
                        <select {...register("categoriesIds", { required: "Category is Required" })} className="py-2 px-3 form-select" aria-label="Default select example">
                            <option value="">Category</option>
                            {categoriesList.map(category => (
                                <option key={category?.id} value={category?.id}>
                                    {category.name}
                                </option>
                            ))}

                        </select>
                    </div>
                    {errors?.categoriesIds && <span className='text-danger'>{errors?.categoriesIds?.message}</span>}
                    {/* Description */}
                    <div className="mb-3">
                        <textarea {...register("description", {
                            required: "Field is Required",
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters"
                            },
                            maxLength: {
                                value: 500,
                                message: "Description must not exceed 500 characters"
                            }
                        })} className="py-2 px-3 form-control" id="exampleFormControlTextarea1" placeholder='Description' rows={3} />
                    </div>

                    {errors?.description && <span className='text-danger'>{errors?.description?.message}</span>}
                    {/* Recipe Image  */}
                    <div className='mb-3'>
                        <input
                            type="file"
                            id="fileInput"
                            className="d-none"
                            {...register("recipeImage")}
                            accept="image/*"
                        />
                        {/* Custom Button */}
                        <label htmlFor="fileInput" className="btn fs-6 py-4  d-flex flex-column input-file align-items-center gap-2" style={{ cursor: 'pointer', width: 'fit-content' }}>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            <span>Drag & Drop or <span className='text-success fw-bolder'>Choose a Item Image</span> to Upload</span>
                        </label>
                    </div>

                    <div className="mb-3 d-flex justify-content-end ">
                        <button onClick={() => navigate('/dashboard/recipes')} className='btn px-4 py-2 btn-outline-success mx-3'>Cancel</button>
                        <button className='btn px-3 btn-success'>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
