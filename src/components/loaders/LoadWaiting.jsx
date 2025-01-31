import React from "react";
import logoIcon from '../../assets/images/logos/logo-green-bg.png'


export default function LoadWaiting(){
    return (
        <div 
            style={{
                minHeight: '100vh'
            }}
            className="d-flex bg-3A5B22 align-items-center justify-content-center"
        >
            <div className="col-lg-5 col-md-5 col-7">
                <img src={logoIcon} className="col-lg-12 col-md-12 col-12" />   
            </div>
        </div>
    )
}