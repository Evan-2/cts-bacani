import Image from "next/image"

export const Index = () => {
    return (
        <section id="dashboard">
            <div className="landscape">
                <div className="container pb-5">
                    <div className="row">
                        <div className="title mb-4 mt-4 mb-4">
                            <h6 className="fs-4 ms-4">Overview</h6>
                        </div>
                    </div>
                    <div className="covid">
                        <div className="details row">
                            <h4 className="index-title">Social Distancing</h4>
                            <p>is one of the best practices to prevent spread of COVID-19.</p>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg">
                                <p>
                                    {" "}
                                    <h5 className="index-title">COVID-19</h5> spread across the world, countries like United State, Italy,
                                    Spain, UK. and Philippines faced high rates of cases, hospitalizations and deaths due to the virus.
                                    Philippines, meanwhile, eluded similar levels of transmission and suffering among its citizens.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center mb-3">
                                <Image src="/vaccine_dose.png" alt="Image" height={200} width={300} />
                            </div>
                            <div className="col-lg mb-3">
                                <h5 className="index-title">Covid-19 Prevention Protocol</h5>
                                <p>1. Maintain a safe distance (at least 1 meter), even if they don&apos;t appear to be sick.</p>
                                <p>2. Wear a mask in public, especially indoors or when physical distancing is not possible.</p>
                                <p>3. Choose open, well-ventillated spaces over closed ones, open window if indoors.</p>
                                <p>4. Clean your hands often, use soap and water, or an alcohol-based hand rub.</p>
                            </div>
                        </div>
                        <div className="col-lg">
                            {" "}
                            <p className="mb-0">
                                Protect your family, relatives, friends and neighbors for the future by initiating contact tracing protocol
                                and be a covid-free.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Index
