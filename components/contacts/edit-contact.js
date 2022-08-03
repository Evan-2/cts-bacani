import { useRef } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const EditContact = ({ contact }) => {
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
    const noteRef = useRef()

    const savePatientHandler = async (event) => {
        event.preventDefault()
        const contact = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contacts/edit`, {
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
                note: noteRef.current.value,
                supervised: session.user.name
            })
        })
        router.reload(window.location.pathname)
        return contact.json()
    }
    return (
        <div
            className="modal fade"
            id={`editContactModal${contact.id}`}
            tabIndex="-1"
            aria-labelledby="patientModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="patientModalLabel">
                            Contact Tracing Form Edit
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
                                    defaultValue={contact.id}
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
                                    defaultValue={contact.firstName}
                                    id="first-name"
                                />
                            </div>
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={middleNameRef}
                                    placeholder="Middle name"
                                    defaultValue={contact.middleName}
                                    id="middle-name"
                                />
                            </div>
                            <div className="col-lg">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={lastNameRef}
                                    placeholder="Last name"
                                    defaultValue={contact.lastName}
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
                                    defaultValue={contact.address}
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
                                    defaultValue={contact.birthDate}
                                />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    ref={genderRef}
                                    defaultValue={contact.gender}
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
                                    defaultValue={contact.contact}
                                />
                            </div>
                            <div className="col-lg">
                                <label className="form-label">Role</label>
                                <select className="form-select" ref={roleRef} aria-label="Default select type" defaultValue={contact.role}>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Staff">Staff</option>
                                </select>
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
                                    defaultValue={contact.note}
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

export default EditContact
