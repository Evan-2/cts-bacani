import { useSession, getSession } from "next-auth/react"
import { ListItem as PatientList } from "@/components/patients/list-item"
import NewPatient from "@/components/patients/new-patient"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"

export const Patients = ({ patients }) => {
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
                            <h6 className="fs-4 ms-4">Patients history</h6>
                            <FontAwesomeIcon
                                className="fa user me-4"
                                data-bs-toggle="modal"
                                data-bs-target="#patientModal"
                                icon={faUserPlus}
                            />
                        </div>
                        <NewPatient />
                        <div className="container">
                            <PatientList data={patients}></PatientList>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const getServerSideProps = async ({ query }) => {
    const page = query.page || 1
    let patients
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients?page=${page}`)
        patients = await request.json()
    } catch (error) {
        patients = {
            error: {
                message: error.message
            }
        }
    }
    return {
        props: {
            patients
        }
    }
}

export default Patients
