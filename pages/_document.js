import Document, { Html, Head, Main, NextScript } from "next/document"
import dynamic from 'next/dynamic'

class Documents extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => App,
                enhanceComponent: (Component) => Component
            })

        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    ></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=optional"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Documents
