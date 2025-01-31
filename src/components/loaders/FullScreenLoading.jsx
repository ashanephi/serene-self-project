import React from "react";
import { useSelector } from 'react-redux'
import './css/loaders.css'
import { getAppLoadingState } from "../redux/slices/appLoadingSlice";



export default function FullScreenLoading(){

    const appLoading = useSelector(state => getAppLoadingState(state).appLoading)

    if(appLoading){
        return (
            // <div className="full-screen-loading" />
            <div className="full-screen-loading-container">
                <div className="full-screen-loader" />
            </div>
        )
    }
}