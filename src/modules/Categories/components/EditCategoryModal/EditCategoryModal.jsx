import React, { useEffect } from 'react'
import { Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function EditCategoryModal({ show, onClose, onConfirm, selectedItem }) {
    let { register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm()

    useEffect(() => {
        if (selectedItem) {
            reset({ name: selectedItem.name })
        }
    }, [selectedItem]) 
    // for handling on confirm for reset form
    const handleConfirm = async (data) => {
        await onConfirm(data)
        reset()
    }

    return (
        <Modal show={show} onHide={() => { reset(); onClose() }} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-6 fw-bold">
                    Edit Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(handleConfirm)}>
                    <div className="rounded-2 input-group mt-5 mb-4">
                        <input {...register("name", { required: "Name is Required" })}
                            type="text"
                            placeholder='Category Name'
                            defaultValue={selectedItem?.name}
                            className="form-control p-2" />
                    </div>
                    {errors?.name && <span className='text-danger'>{errors?.name?.message}</span>}
                    <div className="border-top border-2 mt-2 pt-4 d-flex justify-content-end">
                        <button type="submit" className='btn btn-success px-3 py-2'>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}