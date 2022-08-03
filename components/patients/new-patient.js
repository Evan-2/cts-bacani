import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const NewPatient = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const firstNameRef = useRef()
    const middleNameRef = useRef()
    const lastNameRef = useRef()
    const addressRef = useRef()
    const genderRef = useRef()
    const birthDateRef = useRef()
    const contactRef = useRef()
    const roleRef = useRef()
    const [status, setStatus] = useState("Negative")
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
        const patient = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
                logAt: new Date().toLocaleDateString(),
                supervised: session.user.name
            })
        })
        router.reload(window.location.pathname)
        return patient.json()
    }
    return (
        <div className="modal fade" id="patientModal" tabIndex="-1" aria-labelledby="patientModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="patientModalLabel">
                            Add Patient
                        </h6>
                        <FontAwesomeIcon className="fa xmark" icon={faXmark} data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body mx-2">
                        <div className="name row align-items-center">
                            <label className="form-label">Name</label>
                            <div className="col-lg">
                                <input type="text" className="form-control" ref={firstNameRef} placeholder="First name" id="first-name" />
                            </div>
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={middleNameRef}
                                    placeholder="Middle name"
                                    id="middle-name"
                                />
                            </div>
                            <div className="col-lg">
                                <input type="text" className="form-control" ref={lastNameRef} placeholder="Last name" id="last-name" />
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
                                    id="address"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <label className="form-label">Date of birth</label>
                                <input type="date" className="form-control" ref={birthDateRef} id="birth-date" required />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Gender</label>
                                <select className="form-select" ref={genderRef} aria-label="Default select gender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Contact</label>
                                <input type="text" className="form-control" ref={contactRef} placeholder="Cellphone / Email" id="contact" />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Role</label>
                                <select className="form-select" ref={roleRef} aria-label="Default select type">
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
                                        defaultChecked
                                        required
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
                                        required
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

export default NewPatient
