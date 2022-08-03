import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { EditContact } from "@/components/contacts/edit-contact"
import { DeleteContact } from "@/components/contacts/delete-contact"

export const ListItem = ({ data }) => {
    const [contacts, setContacts] = useState([])
    const router = useRouter()

    useEffect(() => {
        setContacts(data.contacts)
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
            {contacts.map((contact) => (
                <div className="patient-item px-4 py-3" key={contact.id}>
                    <div className="name row">
                        <div className="d-flex align-items-center justify-content-between">
                            <small className="id">ID: {contact.id}</small>
                            <div className="controls d-flex">
                                <FontAwesomeIcon
                                    className="fa pen ms-3"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#editContactModal${contact.id}`}
                                    icon={faPenToSquare}
                                />
                                <EditContact contact={contact} />
                                <FontAwesomeIcon
                                    className="fa trash ms-3"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deleteContactModal${contact.id}`}
                                    icon={faTrashCan}
                                />
                                <DeleteContact contact={contact} />
                            </div>
                        </div>
                        <h5 className="name col-lg-3 m-0">{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}</h5>
                    </div>
                    <div className="details row align-items-center">
                        <p className="col-lg-4 m-0">Address: {contact.address}</p>
                        <small className="col-lg-3">Date of birth: {contact.birthDate}</small>
                        <small className="col">Gender: {contact.gender}</small>
                        <small className="col log">Log: {contact.logAt}</small>
                    </div>
                    <div className="role row">
                        <small className="value">Category: {contact.role}</small>
                    </div>
                    <div className="remarks row justify-content-between">
                        <small className="note col-lg">Remark: *** {contact.note}</small>
                        <small className="col-lg-auto"> Supervised by: {contact.supervised} </small>
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
