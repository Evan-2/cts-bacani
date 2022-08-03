import "bootstrap/dist/css/bootstrap.min.css"
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { Layout } from "@/components/layout"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

import "@/styles/globals.scss"

export const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    useEffect(() => {
        import("bootstrap")
    }, [])
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

export default App
