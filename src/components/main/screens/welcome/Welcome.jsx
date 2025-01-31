import React from "react";
import { Carousel } from "react-bootstrap";
import welcomeImg1 from '../../../../assets/images/welcome/welcome-1-img-1.png'
import welcomeImg2 from '../../../../assets/images/welcome/welcome-2-img-1.png'
import './css/welcome.css'
import { useNavigate } from "react-router-dom";



export default function Welcome(){

    const navigate = useNavigate()
    const navigateTo = path => navigate(path)
    const goToDashboard = () => navigateTo('/dashboard')

    return(
        <div>
            <Carousel
                controls={false}
                interval={5000}
            >
                <Carousel.Item>
                    <div className="bg-img welcome-bg welcome-bg-1">
                        <div className="welcome-1-box-container">
                            <div className="p-4 col-lg-7 col-md-12 col-12 h-100 d-flex flex-column justify-content-between">
                                <div className="">
                                    <h1 className="m-0 p-0 mb-3 font-family-SourceCodePro txt-FFF fw-500 txt-35">
                                        Serene-Self. Your mind's quiet companion.
                                        <br />
                                    </h1>
                                    <p className="m-0 p-0 font-family-Poppins txt-FFF fw-500 txt-18">
                                        Your digital journal for reflection, insights, and mental wellness—powered by your words.
                                    </p>
                                </div>

                                <div className="mb-5 pb-5" />
                                <div className="mb-5 pb-5" />

                                <button
                                    onClick={goToDashboard}
                                    className="welcome-1-btn w-lg-75 w-md-100 w-100"
                                >
                                    How was your day ?
                                </button>
                            </div>
                            
                            <div className="d-lg-block d-md-none d-none col-lg-5 col-md-5 col-5">
                                <img src={welcomeImg1} className="col-lg-12 col-md-12 col-12" />
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="bg-img welcome-bg welcome-bg-2">
                        <div className="welcome-2-box-container">
                            <div className="p-4 col-lg-7 col-md-12 col-12 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h1 className="m-0 p-0 mb-3 font-family-SourceCodePro txt-FFF fw-500 txt-35">
                                        Serene-Self. Where thoughts meet clarity.
                                        <br />
                                    </h1>
                                    <p className="m-0 p-0 font-family-Poppins txt-FFF fw-500 txt-18">
                                        Your space for reflection, clarity, and self-awareness—powered by your story.
                                    </p>
                                </div>

                                <div className="mb-5 pb-5" />
                                <div className="mb-5 pb-5" />
                                <div className="mb-5" />

                                <button
                                    className="welcome-2-btn w-lg-75 w-md-100 w-100"
                                >
                                    My writings
                                </button>
                            </div>
                            <div className="d-lg-block d-md-none d-none col-lg-5 col-md-5 col-5">
                                <img src={welcomeImg2} className="col-lg-12 col-md-12 col-12" />
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                {/* <Carousel.Item>
                    <div className="bg-img welcome-bg welcome-bg-3">

                    </div>
                </Carousel.Item>                                 */}
            </Carousel>
        </div>
    )
}