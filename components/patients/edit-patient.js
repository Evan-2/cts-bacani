import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const EditPatient = ({ patient }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const idRef = useRef()
    const firstNameRef = useRef()
    const middleNameRef = useRef()
    const lastNameRef = useRef()
    const addressRef = useRef()
    const genderRef = useRef()
    const birthDateRef = useRef()
    const contactRef = useRef()
    const roleRef = useRef()
    const [status, setStatus] = useState(patient.status)
    const noteRef = useRef()

    const negativeHandler = () => {
        setStatus("Negative")
    }

    const positiveHandler = () => {
        setStatus("Positive")
    }

    const asymptomaticHandler = () => {
        setStatus("Asymptomatic")
    }

    const savePatientHandler = async (event) => {
        event.preventDefault()
        const patient = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idRef.current.value,
                firstName: firstNameRef.current.value,
                middleName: middleNameRef.current.value,
                lastName: lastNameRef.current.value,
                address: addressRef.current.value,
                birthDate: new Date(birthDateRef.current.value).toLocaleDateString(),
                gender: genderRef.current.value,
                contact: contactRef.current.value,
                role: roleRef.current.value,
                status: status,
                note: noteRef.current.value,
                supervised: session.user.name
            })
        })
        router.reload(window.location.pathname)
        return patient.json()
    }
    return (
        <div
            className="modal fade"
            id={`editPatientModal${patient.id}`}
            tabIndex="-1"
            aria-labelledby="patientModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="patientModalLabel">
                            Edit Patient
                        </h6>
                        <FontAwesomeIcon className="fa xmark" icon={faXmark} data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body mx-2">
                        <div className="name row align-items-center">
                            <div className="id d-flex align-items-center">
                                <label className="form-label m-0">ID: </label>{" "}
                                <input
                                    type="text"
                                    className="id-value form-control border-0 p-0 ms-2"
                                    ref={idRef}
                                    defaultValue={patient.id}
                                    disabled
                                />
                            </div>
                            <label className="form-label">Name</label>
                            <div className="col-lg">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={firstNameRef}
                                    placeholder="First name"
                                    defaultValue={patient.firstName}
                                    id="first-name"
                                />
                            </div>
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={middleNameRef}
                                    placeholder="Middle name"
                                    defaultValue={patient.middleName}
                                    id="middle-name"
                                />
                            </div>
                            <div className="col-lg">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={lastNameRef}
                                    placeholder="Last name"
                                    defaultValue={patient.lastName}
                                    id="last-name"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <label className="form-label">Address</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    ref={addressRef}
                                    cols="40"
                                    rows="3"
                                    placeholder="Address..."
                                    defaultValue={patient.address}
                                    id="address"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <label className="form-label">Date of birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    ref={birthDateRef}
                                    id="birth-date"
                                    defaultValue={patient.birthDate}
                                />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    ref={genderRef}
                                    defaultValue={patient.gender}
                                    aria-label="Default select gender"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Contact</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={contactRef}
                                    placeholder="Cellphone / Email"
                                    id="contact"
                                    defaultValue={patient.contact}
                                />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Role</label>
                                <select className="form-select" ref={roleRef} aria-label="Default select type" defaultValue={patient.role}>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>
                            <div className="row mt-3">
                                <label className="form-label">Covid Status</label>
                                <div className="col-lg">
                                    <input
                                        className="form-check-input"
                                        value={status === "Negative"}
                                        onChange={negativeHandler}
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label ms-3" htmlFor="flexRadioDefault1">
                                        Negative
                                    </label>
                                </div>
                                <div className="col-lg">
                                    <input
                                        className="form-check-input"
                                        value={status === "Positive"}
                                        onChange={positiveHandler}
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault3"
                                    />
                                    <label className="form-check-label ms-3" htmlFor="flexRadioDefault3">
                                        Positive
                                    </label>
                                </div>
                                <div className="col-lg">
                                    <input
                                        className="form-check-input"
                                        value={status === "Asymptomatic"}
                                        onChange={asymptomaticHandler}
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                    />
                                    <label className="form-check-label ms-3" htmlFor="flexRadioDefault2">
                                        Asymptomatic
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <label className="form-label">Remarks</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    ref={noteRef}
                                    cols="40"
                                    rows="4"
                                    placeholder="Notes..."
                                    defaultValue={patient.note}
                                    id="remarks"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary px-4" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button onClick={savePatientHandler} className="btn btn-sm btn-primary px-4" data-bs-dismiss="modal" type="button">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPatient
