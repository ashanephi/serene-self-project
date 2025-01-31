import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './css/alertMsg.css'
import { getAlertMsgState, hideAlertMsg } from "../redux/slices/alertMsgSLice";
import { FaLightbulb } from "react-icons/fa";



export default function AlertMsg(){
    const dispatch = useDispatch()

    const msg = useSelector(state => getAlertMsgState(state).msg)
    const type = useSelector(state => getAlertMsgState(state).type)

    const [fadeClass, setFadeClass] = useState("");

    useEffect(() => {
        if(msg && type){
            setFadeClass("alert-msg-fade-in");
        }
    }, [msg, type])

    useEffect(() => {
        if(fadeClass == 'alert-msg-fade-in'){
            const timeout1 = setTimeout(() => {
                setFadeClass("alert-msg-fade-out");
                dispatch(hideAlertMsg())
                clearTimeout(timeout1)
            }, 3000)


            return () => {
                clearTimeout(timeout1)
            }
        }
    }, [fadeClass])

    if(!msg && !type){
        return;
    }

    return (
        <div className={`${fadeClass} alert-msg-body w-100`}>
            <div 
                style={{
                    backgroundColor: 
                        type == 'success'
                        ?
                            '#3A5B22'
                        :
                        type == 'error'
                        ?
                            "#EC2020"
                        :
                        type == 'info'
                        ?
                            "#E1F013"
                        :
                            "transparent"
                }}
                className="alert-msg-container w-100 m-4 mx-lg-5 mx-md-3 mx-2"
            >
                <FaLightbulb 
                    color="#FFF"
                    size={20}
                />
                <p className="m-0 p-0 font-family-SourceCodePro txt-14 fw-500 txt-FFF">
                    { msg }
                </p>
            </div>
        </div>
    )
}