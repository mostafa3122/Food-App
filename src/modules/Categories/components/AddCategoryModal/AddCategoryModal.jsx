import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export default function AddCategoryModal({ show, onClose, onConfirm }) {
    let { register, formState: { errors, isSubmitting }, handleSubmit,reset } = useForm()
    
    // for handling on confirm for reset form
    const handleConfirm = async (data) => {
        await onConfirm(data)
        reset()
    }

    return (
        <Modal show={show} onHide={() => { reset(); onClose() }} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-6 fw-bold">
                    Add New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body  >
                {/* Form  */}
                <form onSubmit={handleSubmit(handleConfirm)}>
                    <div className="rounded-2  input-group mt-5   mb-4">
                        <input {...register("name", { required: "Name is Required" })}
                            type="text"
                            placeholder='Category Name'
                            className="form-control  p-2"
                            aria-describedby="categoryNAmeHelpBlock" />
                    </div>

                    {errors?.name && <span className='text-danger '>{errors?.name?.message}</span>}

                    <div className="border-top border-2 mt-2 pt-4 d-flex justify-content-end ">
                        <button type="submit" className='btn btn-success px-3 py-2 '>
                            {isSubmitting ? "Adding..." : "Add Category"}
                        </button>
                    </div>

                </form>
            </Modal.Body>

        </Modal>
    )
}