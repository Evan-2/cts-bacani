import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { EditPatient } from "@/components/patients/edit-patient"
import { DeletePatient } from "@/components/patients/delete-patient"

export const ListItem = ({ data }) => {
    const [patients, setpatients] = useState([])
    const router = useRouter()

    useEffect(() => {
        setpatients(data.patients)
    }, [data])

    const paginationHandler = (page) => {
        const path = router.pathname
        const query = router.query

        query.page = page.selected + 1
        router.push({
            pathname: path,
            query: query
        })
    }

    return (
        <div className="patient-list p-0">
            {patients.map((patient) => (
                <div className="patient-item px-4 py-3" key={patient.id}>
                    <div className="name row">
                        <div className="d-flex align-items-center justify-content-between">
                            <small className="id">ID: {patient.id}</small>
                            <div className="controls d-flex">
                                <FontAwesomeIcon
                                    className="fa pen ms-3"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#editPatientModal${patient.id}`}
                                    icon={faPenToSquare}
                                />
                                <EditPatient patient={patient} />
                                <FontAwesomeIcon
                                    className="fa trash ms-3"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deletePatientModal${patient.id}`}
                                    icon={faTrashCan}
                                />
                                <DeletePatient patient={patient} />
                            </div>
                        </div>
                        <h5 className="name col-lg-3 m-0">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</h5>
                    </div>
                    <div className="details row align-items-center">
                        <p className="col-lg-4 m-0">Address: {patient.address}</p>
                        <small className="col-lg-3">Date of birth: {patient.birthDate}</small>
                        <small className="col">Gender: {patient.gender}</small>
                        <small className="col">
                            Status: <span>{patient.status}</span>
                        </small>
                        <small className="col log">Log: {patient.logAt}</small>
                    </div>
                    <div className="role row">
                        <small className="value">Category: {patient.role}</small>
                    </div>
                    <div className="remarks row justify-content-between">
                        <small className="note col-lg">Remark: *** {patient.note}</small>
                        <small className="col-lg-auto"> Supervised by: {patient.supervised} </small>
                    </div>
                </div>
            ))}
            <ReactPaginate
                className="pagination d-flex justify-content-center mt-4 fixed-bottom mb-5"
                breakLabel={"..."}
                nextLabel={"Next"}
                pageRangeDisplayed={5}
                previousLabel={"Previous"}
                onPageChange={paginationHandler}
                pageCount={data.maxPage}
                initialPage={data.curPage - 1}
            />
        </div>
    )
}

export default ListItem
