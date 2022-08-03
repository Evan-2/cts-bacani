import { useSession, getSession } from "next-auth/react"
import { ListItem as ContactList } from "@/components/contacts/list-item"
import NewContact from "@/components/contacts/new-contact"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"

export const Contacts = ({ contacts }) => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    return (
        <section id="patients">
            <div className="landscape">
                <div className="container pb-5">
                    <div className="row">
                        <div className="title mb-4 mt-4 d-flex justify-content-between align-items-center">
                            <h6 className="fs-4 ms-4">Contact history</h6>
                            <FontAwesomeIcon
                                className="fa user me-4"
                                data-bs-toggle="modal"
                                data-bs-target="#contactModal"
                                icon={faUserPlus}
                            />
                        </div>
                        <NewContact />
                        <div className="container">
                            <ContactList data={contacts}></ContactList>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const getServerSideProps = async ({ query }) => {
    const page = query.page || 1
    let contacts
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contacts?page=${page}`)
        contacts = await request.json()
    } catch (error) {
        contacts = {
            error: {
                message: error.message
            }
        }
    }
    return {
        props: {
            contacts
        }
    }
}

export default Contacts
