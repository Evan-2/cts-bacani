import { Chart } from "@/components/chart"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useQRCode } from "next-qrcode";

export const Dashboard = ({ positive, asymptomatic }) => {
    const { data: session } = useSession()

    const { Canvas } = useQRCode()

    let pos = positive.positive,
        neg = 3000,
        asymp = asymptomatic.asymptomatic

    const _positive = ((pos / neg) * 100).toFixed(2)
    const _negative = (((neg - pos - asymp) / 3000) * 100).toFixed(2)
    const _asymptomatic = ((asymp / neg) * 100).toFixed(2)

    const covid = [_positive, _negative, _asymptomatic]

    const overview = [
        {
            label: "Positive",
            result: _positive
        },
        {
            label: "Negative",
            result: _negative
        },
        {
            label: "Asymptomatic",
            result: _asymptomatic
        }
    ]

    return (
        <section id="dashboard">
            <div className="landscape">
                <div className="container pb-5">
                    <div className="row">
                        <div className="title mb-4 mt-4 mb-4">
                            <h6 className="fs-4 ms-4">Dashboard</h6>
                        </div>
                    </div>
                    <div className="row covid">
                        <div className="row">
                            <h5>User QR Code</h5>
                            {session && (
                                <div>
                                    <Canvas
                                    text={session.user.email}
                                    options={{
                                        type: 'image/jpeg',
                                        quality: 0.3,
                                        level: 'M',
                                        margin: 3,
                                        scale: 4,
                                        width: 200,
                                        color: {
                                        dark: '#000',
                                        light: '#fff',
                                        },
                                    }}
                                    />
                                </div>
                            )}
                        </div>
                        <h4 className="dashboard-title">Covid-19 Overview</h4>
                        <div className="details col-lg mt-4">
                            <div className="covid-list row">
                                {overview.map(({ label, result }, index) => (
                                    <div className="col-lg d-flex justify-content-center align-items-center mb-5 flex-column" key={index}>
                                        <h5 className="col-3 mb-3 text-center">{label}</h5>
                                        <div className="circular-data">
                                            <svg className="circular" viewBox="0 0 36 36">
                                                <path
                                                    className="circular-bar"
                                                    fill="none"
                                                    stroke="#79b6e3"
                                                    strokeWidth="1"
                                                    strokeDasharray="100, 100"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <text
                                                    className="text"
                                                    textAanchor="middle"
                                                    x="10"
                                                    y="21"
                                                    fill="#66b266"
                                                    fontSize="0.4rem"
                                                    fontWeight={600}
                                                >
                                                    {result}%
                                                </text>
                                            </svg>
                                            <svg className="percentage" viewBox="0 0 36 36">
                                                <path
                                                    className="percentage-bar"
                                                    fill="none"
                                                    stroke="#10375c"
                                                    strokeWidth="3"
                                                    strokeDasharray={[result, 100]}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="banner">
                            <div className="row justify-content-between">
                                <div className="presentation col-lg-6 d-flex flex-column justify-content-center">
                                    <h5 className="mb-4">Overview Presentation Details:</h5>
                                    <div className="row justify-content-center">
                                        <div className="picture col-lg-6">
                                            <Image className="picture" src="/contact-tracing.svg" alt="Image" height={500} width={500} />
                                        </div>
                                        <div className="col-lg d-flex flex-column justify-content-center">
                                            <p>As you can see, Positive chart is under the amount of {_positive}%.</p>
                                            <p> Negative chart is under the amount of {_negative}%. </p>
                                            <p> Asymtomatic chart is under the amount of {_asymptomatic}%. </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="graph col-lg-5 d-flex justify-content-center">
                                    <Chart covid={covid} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const getServerSideProps = async () => {
    let negative, positive, asymptomatic
    try {
        const reqNegative = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/negative`)
        negative = await reqNegative.json()

        const reqPositive = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/positive`)
        positive = await reqPositive.json()

        const reqAsymptomatic = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/asymptomatic`)
        asymptomatic = await reqAsymptomatic.json()
    } catch (error) {
        negative = {
            error: {
                message: error.message
            }
        }
        positive = {
            error: {
                message: error.message
            }
        }
        asymptomatic = {
            error: {
                message: error.message
            }
        }
    }
    return {
        props: {
            negative,
            positive,
            asymptomatic
        }
    }
}

export default Dashboard
