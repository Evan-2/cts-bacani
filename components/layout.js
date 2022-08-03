import { Meta } from "@/components/meta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
