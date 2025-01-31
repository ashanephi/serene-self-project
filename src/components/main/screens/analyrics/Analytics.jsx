import React, { useEffect } from "react";
import Navigation from "../../navigation/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import './css/analytics.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);



export default function Analytics(){

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const stateData = useLocation().state

    useEffect(() => {
        if(!stateData || !stateData.entry){
            goBack()
        }
    }, [])

    if(!stateData || !stateData.entry){
        return <></>
    }

    const { entry } = stateData
    const { sadness, title, entry_text, joy, love, anger, fear } = entry

    return (
        <div style={{ minHeight: '100vh' }} className="writing-bg bg-FDFBFF">
            <Navigation />

            <div style={{ paddingTop: '61px' }} className="d-flex flex-column align-items-center justify-content-center">
                <div className="analytics-chart-container col-lg-8 mb-4">
                    <h1 className="m-0 p-0 font-family-OpenSans txt-000 txt-24 fw-700">
                        <span className="font-family-Sacramento">"{ title }"</span>
                    </h1>
                </div>
                
                
                <div className="analytics-chart-container col-lg-8 mb-4">
                    <h1 className="m-0 p-0 mb-5 font-family-OpenSans txt-000 txt-24 fw-700">
                        <span className="font-family-Sacramento">A.N.A.L.Y.S.I.S</span>
                    </h1>

                    <div className="d-flex align-items-center justify-content-center">
                        <div className="w-50">
                            <Pie 
                                options={{
                                    plugins: {
                                        legend: {
                                        position: "top",
                                        },
                                        tooltip: {
                                        enabled: true,
                                        },
                                    },
                                    responsive: true,                               
                                }}
                                data={{
                                    labels: ['Sadness', 'Joy', 'Love', 'Anger', 'Fear'],
                                    datasets: [
                                    {
                                        label: 'Emotional analysis',
                                        data: [sadness, joy, love, anger, fear],
                                        backgroundColor: [
                                            '#4A90E2', "#F7D154", "#E74C3C", "#D63031", "#8E44AD"
                                        ],
                                        borderColor: [
                                        '#2C6AB4', "#C9A93F", "#C0392B", "#A71D22", "5B2C6F"
                                        ],
                                        borderWidth: 1,
                                    },
                                    ],
                                }} 
                            />
                        </div>
                    </div>
                </div>
            
                <div className="analytics-chart-container col-lg-8 mb-4">
                    <h1 className="m-0 p-0 mb-5 font-family-OpenSans txt-000 txt-24 fw-700">
                        <span className="font-family-Sacramento">How It Went</span>
                    </h1>                    
                    <p className="m-0 p-0 font-family-SourceCodePro fw-300 txt-18 txt-000">
                        { entry_text }
                    </p>
                </div>
            </div>
        </div>
    )
}