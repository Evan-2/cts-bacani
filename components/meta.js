import Head from "next/head"

export const Meta = () => {
    return (
        <Head>
            <link rel="icon" type="image/png" sizes="16x16" href="/gps.png" />
            <meta name="description" content={`A next.js project for covid contact tracing`} />
            <title>{`Contact Tracing System`}</title>
        </Head>
    )
}

export default Meta
