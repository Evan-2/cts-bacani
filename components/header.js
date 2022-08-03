import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/react"

export const Header = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const isActive = (path) => {
        return router.pathname === path && "active"
    }

    const logo = "Contact Tracing System"

    const signin = (event) => {
        event.preventDefault()
        signIn("google")
    }

    return (
        <header id="header" className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light navbar-light">
                <div className="container">
                    <Link href={"/index"}>
                        <a className="navbar-brand d-flex justify-content-center align-items-center">
                            <Image className="icon" src={`/gps.png`} alt="favicon" width={24} height={24} objectFit="contain" />
                            <span className={`cts ${isActive("/index")}`}>{logo}</span>
                        </a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href={`/dashboard`}>
                                    <a className={`nav-link ${isActive("/dashboard")}`} aria-current="page">
                                        <span className="ms-2">Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            {session && (
                                <li className="nav-item">
                                    <Link href={`/patients`}>
                                        <a className={`nav-link ${isActive("/patients")}`} aria-current="page">
                                            <span className="ms-2">Patients</span>
                                        </a>
                                    </Link>
                                </li>
                            )}
                            {session && (
                                <li className="nav-item">
                                    <Link href={`/contacts`}>
                                        <a className={`nav-link ${isActive("/contacts")}`} aria-current="page">
                                            <span className="ms-2">Contacts</span>
                                        </a>
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link href={`/qrscanner`}>
                                    <a className={`nav-link ${isActive("/qrscanner")}`} aria-current="page">
                                        <span className="ms-2">QR Scanner</span>
                                    </a>
                                </Link>
                            </li>
                            {!session && (
                                <li className="nav-item">
                                    <a className={`sign-in nav-link`} onClick={signin}>
                                        <span className="ms-2">Sign-in</span>
                                    </a>
                                </li>
                            )}
                            {session && (
                                <li className="nav-item">
                                    <a className={`sign-in nav-link`} onClick={signOut}>
                                        <span className="ms-2">Sign-out</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
