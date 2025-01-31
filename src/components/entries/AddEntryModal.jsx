import React, { useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import './css/entries.css'
import { appLoadStart, appLoadStop } from "../redux/slices/appLoadingSlice";
import { showAlertMsg } from "../redux/slices/alertMsgSlice";
import { getUserDetailsState, setUserDetails } from "../redux/slices/userDetailsSlice";
import { onRequestApi } from "../apiRequests/requestApi";
import CustomErrorMsg from "../customErrorMsg/CustomErrorMsg";


export default function AddEntryModal({ modalProps }){
    const dispatch = useDispatch()

    const entries = useSelector(state => getUserDetailsState(state).entries)
    const details = useSelector(state => getUserDetailsState(state).details)
    const accessToken = useSelector(state => getUserDetailsState(state).accessToken)

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [title, setTitle] = useState('')
    const [entryText, setEntryText] = useState('')

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading){
            dispatch(appLoadStart())
        
        } else{
            dispatch(appLoadStop())
        }

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'addEntry'){
                onRequestApi({
                    requestInfo,
                    successCallBack: addEntrySuccess,
                    failureCallback: addEntryFailure
                })
            }
        }
    }, [apiReqs])

    const addEntrySuccess = ({ result }) => {
        try {

            const { data } = result
            
            const updatedEntries = [
                ...entries, data
            ]

            dispatch(setUserDetails({ entries: updatedEntries }))

            setApiReqs({ isLoading: false, data: null, errorMsg: null })
            
            hide()

            dispatch(showAlertMsg({ msg: 'Entry added', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return addEntryFailure({ errorMsg: 'Something went wrong! Try again later.' })
        }
    }
    
    const addEntryFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }

    if(!modalProps){
        return <></>
    }

    const { visible, hide } = modalProps

    const handleTitleInput = e => e && setTitle(e.target.value)
    const handleEntryTextInput = e => e && setEntryText(e.target.value)
    
    const validateTextInputs = () => {
        if(!title){
            setApiReqs({ isLoading: false, data: null, errorMsg: 'Your entry deserves a title' })
            return false
        }

        if(!entryText){
            setApiReqs({ isLoading: false, data: null, errorMsg: 'This is a safe space. Feel free to share your thoughts' })
            return false
        }

        return true
    }

    const saveEntry = () => {

        const inputsValidated = validateTextInputs()

        if(inputsValidated){
            return setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'addEntry',
                    requestInfo: {
                        url: 'users/entries/add-entry',
                        method: 'POST',
                        data: {
                            user_id: details.user_id,
                            title,
                            entry_text: entryText
                        },
                        token: accessToken
                    }
                }
            })            
        }


        return;
    }

    return (
        <Modal
            show={visible}
            onHide={hide}
            size="lg"
            backdrop="static"
            centered={true}
        >
            <div
                style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
                }} 
                className="p-3 d-flex align-items-center justify-content-between mb-4"
            >
                <div className="col-lg-4" />
                <div className="col-lg-4 d-flex align-items-center justify-content-center">
                    <h1 className="font-family-Sacramento m-0 p-0 txt-000 fw-400 txt-30">
                        Today's thoughts...?
                    </h1>
                </div>
                <div className="col-lg-4 d-flex align-items-center justify-content-end">
                    <IoCloseOutline size={30} color="#3A5B22" className="clickable" onClick={hide} />
                </div>
            </div>

            {
                apiReqs.errorMsg
                &&
                    <div className="px-lg-5 px-md-3 px-3 d-flex align-items-center justify-content-center">
                        <CustomErrorMsg isCentered={true} errorMsg={apiReqs.errorMsg} />
                    </div>                
            }

            <div className="p-lg-5 p-md-3 p-3">
                <input 
                    value={title}
                    onChange={handleTitleInput}
                    placeholder="Stressed..? Happy...? What a day huh...?"
                    className="w-lg-75 w-md-100 w-100 mb-4 add-entry-input txt-18 fw-700 font-family-SourceCodePro txt-000"
                />
                <textarea 
                    value={entryText}
                    onChange={handleEntryTextInput}
                    style={{
                        minHeight: '40vh',                    
                    }}
                    placeholder="Go on...Don't be shy..."
                    className="w-100 add-entry-input txt-15 fw-500 font-family-SourceCodePro txt-000"
                />                
            </div>

            <ModalFooter>
                <button 
                    type="submit"
                    onClick={saveEntry}
                    className="py-2 px-4 rounded-3 bg-3A5B22 txt-FFF fw-500 txt-15 font-family-OpenSans"
                >
                    Add
                </button>
            </ModalFooter>
        </Modal>
    )
}