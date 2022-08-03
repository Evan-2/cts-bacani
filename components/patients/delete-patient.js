import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const DeletePatient = ({ patient }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const idRef = useRef()

    const savePatientHandler = async (event) => {
        event.preventDefault()
        const patient = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idRef.current.value
            })
        })
        router.reload(window.location.pathname)
        return patient.json()
    }
    return (
        <div
            className="modal fade"
            id={`deletePatientModal${patient.id}`}
            tabIndex="-1"
            aria-labelledby="patientModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="patientModalLabel">
                            Delete Patient
                        </h6>
                        <FontAwesomeIcon className="fa xmark" icon={faXmark} data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body mx-2">
                        <div className="id d-flex align-items-center">
                            <label className="form-label m-0">ID: </label>{" "}
                            <div className="col">
                                <input
                                    type="text"
                                    className="id-value form-control border-0 p-0 ms-2"
                                    ref={idRef}
                                    defaultValue={patient.id}
                                    disabled
                                />
                            </div>
                        </div>
                        <label className="form-label">Do you want to delete, Patient: {`${patient.firstName} ${patient.lastName}`}?</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary px-4" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button onClick={savePatientHandler} className="btn btn-sm btn-primary px-4" data-bs-dismiss="modal" type="button">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePatient
