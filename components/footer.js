import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingColumns, faFingerprint } from "@fortawesome/free-solid-svg-icons"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"

export const Footer = () => {
    return (
        <div id="footer" className="fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="nav d-flex align-items-center justify-content-between">
                            <li className="educ">
                                <Link href="https://up.phinma.edu.ph/">
                                    <a className="phima  d-flex align-items-center">
                                        <FontAwesomeIcon icon={faBuildingColumns} />
                                        <span className="ms-2">University of Pangasinan</span>
                                    </a>
                                </Link>
                            </li>
                            {/* <li className="d-flex align-items-center ms-3">
                                    <Link href="https://www.facebook.com/phinmaupang">
                                        <a className="facebook  d-flex align-items-center">
                                            <FontAwesomeIcon icon={faFacebookSquare} />
                                            <span className="ms-2">Facebook</span>
                                        </a>
                                    </Link>
                                </li> */}
                            <li className="ms-3">
                                <FontAwesomeIcon icon={faFingerprint} />
                                <span className="ms-2 me-5">Copyright by Group III</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
