import React, { useEffect, useState } from "react";
import Navigation from "../../navigation/Navigation";
import { FaScrewdriverWrench, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsState, setUserDetails } from "../../../redux/slices/userDetailsSlice";
import { appLoadStart, appLoadStop } from "../../../redux/slices/appLoadingSlice";
import { onRequestApi } from "../../../apiRequests/requestApi";
import { showAlertMsg } from "../../../redux/slices/alertMsgSlice";
import ScrollToTop from "../../../customScroll/ScrollToTop";
import CustomErrorMsg from "../../../customErrorMsg/CustomErrorMsg";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../regex/regex";
import { Collapse } from "react-bootstrap";



export default function Settings(){
    const dispatch = useDispatch()

    const details = useSelector(state => getUserDetailsState(state).details)
    const accessToken = useSelector(state => getUserDetailsState(state).accessToken)

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [emailInput, setEmailInput] = useState('')
    const [usernameInput, setUsernameInput] = useState('')
    const [oldPasswordInput, setOldPasswordInput] = useState('')
    const [newPasswordInput, setNewPasswordInput] = useState('')
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [showNewPasswordInput, setShowNewPasswordInput] = useState(false)

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading){
            dispatch(appLoadStart())
        
        } else{
            dispatch(appLoadStop())
        }

        if(isLoading && data){
            const { requestInfo, type } = data

            if(type == 'updateProfile'){
                onRequestApi({
                    requestInfo,
                    successCallBack: updateProfileSuccess,
                    failureCallback: updateProfileFailure
                })
            }

            if(type == 'updateEmail'){
                onRequestApi({
                    requestInfo,
                    successCallBack: updateEmailSuccess,
                    failureCallback: updateEmailFailure
                })
            }

            if(type == 'validateOldPassword'){
                onRequestApi({
                    requestInfo,
                    successCallBack: validateOldPasswordSuccess,
                    failureCallback: validateOldPasswordFailure
                })
            }

            if(type == 'resetPassword'){
                onRequestApi({
                    requestInfo,
                    successCallBack: resetPasswordSuccess,
                    failureCallback: resetPasswordFailure
                })
            }
        }
    }, [apiReqs])





    //updateProfile success && failure
    const updateProfileSuccess = ({ result }) => {
        try {

            const { data } = result

            const updatedUserDetails = {
                ...details,
                ...data
            }

            dispatch(setUserDetails({ details: updatedUserDetails }))

            setApiReqs({ isLoading: false, data: null, errorMsg: null })
            setUsernameInput('')

            dispatch(showAlertMsg({ msg: 'Profile updated', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return updateProfileFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const updateProfileFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }





    // updateEmail success && failure
    const updateEmailSuccess = ({ result }) => {
        try {

            const { data } = result
            const { email } = data

            dispatch(setUserDetails({
                details: { ...details, email }
            }))

            setApiReqs({ isLoading: false, data: null, errorMsg: null })
            setEmailInput('')

            dispatch(showAlertMsg({ msg: 'Email updated', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return updateEmailFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const updateEmailFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }





    // validateOldPassword success && failure
    const validateOldPasswordSuccess = ({ result }) => {
        try {

            setShowNewPasswordInput(true)
            setApiReqs({ isLoading: false, data: null, errorMsg: null })

            dispatch(showAlertMsg({ msg: 'Old password validated', type: 'success' }))

            return
            
        } catch (error) {
            console.log(error)
            return validateOldPasswordFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const validateOldPasswordFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }





    // resetPassword success && failure
    const resetPasswordSuccess = ({ result }) => {
        try {

            setOldPasswordInput('')
            setNewPasswordInput('')
            setShowNewPasswordInput(false)

            setApiReqs({ isLoading: false, data: null, errorMsg: null })

            dispatch(showAlertMsg({ msg: 'Password reset successful', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return resetPasswordFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const resetPasswordFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }





    const handleEmailInputChange = e => e && setEmailInput(e.target.value)
    const handleUsernameInputChange = e => e && setUsernameInput(e.target.value)
    const handleOldPasswordInputChange = e => e && setOldPasswordInput(e.target.value)
    const handleNewPasswordInputChange = e => e && setNewPasswordInput(e.target.value)

    const toggleOldPasswordVisibility = () => setOldPasswordVisible(prev => !prev)
    const toggleNewPasswordVisibility = () => setNewPasswordVisible(prev => !prev)

    const updateUsername = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })

        if(!usernameInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: "You haven't entered a new username yet" })
        }

        if(usernameInput.length > 50){
            return setApiReqs({ isLoading: false, data: null, errorMsg: 'Username must not be more than 50 characters'})
        }

        return setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'updateProfile',
                requestInfo: {
                    url: 'users/settings/edit-profile',
                    method: 'POST',
                    data: {
                        user_id: details.user_id,
                        update: {
                            username: usernameInput
                        }
                    },
                    token: accessToken
                }
            }
        })        
    }

    const updateEmail = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })

        if(!emailInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: "You haven't entered a new email yet" })
        }

        if(!emailInput.match(EMAIL_REGEX)){
            return setApiReqs({ isLoading: false, data: null, errorMsg: 'New email must match the pattern of a valid email address'})
        }

        return setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'updateEmail',
                requestInfo: {
                    url: 'users/settings/update-email',
                    method: 'POST',
                    data: {
                        user_id: details.user_id,
                        email: emailInput
                    },
                    token: accessToken
                }
            }
        })
    }

    const validateOldPassword = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })
        setShowNewPasswordInput(false)
        setNewPasswordInput('')

        if(!oldPasswordInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: "You haven't entered your old password yet" })
        }

        return setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'validateOldPassword',
                requestInfo: {
                    url: 'users/settings/validate-old-password',
                    method: 'POST',
                    data: {
                        user_id: details.user_id,
                        oldPassword: oldPasswordInput
                    },
                    token: accessToken
                }
            }
        })
    }

    const resetPassword = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })

        if(!newPasswordInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: "You haven't entered a new password yet" })
        }

        if(!newPasswordInput.match(PASSWORD_REGEX)){
            return setApiReqs({ isLoading: false, data: null, errorMsg: "New password must contain a number, an upper & lower case character and a special character" })
        }

        return setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'resetPassword',
                requestInfo: {
                    url: 'users/settings/reset-password',
                    method: 'POST',
                    data: {
                        oldPassword: oldPasswordInput,
                        newPassword: newPasswordInput,
                        user_id: details.user_id
                    },
                    token: accessToken
                }
            }
        })
    }

    return (
        <div style={{ minHeight: '100vh' }} className="bg-FDFBFF">
            <Navigation />

            <ScrollToTop 
                scrollToTopCondition={apiReqs.errorMsg}
            >
                <div className="writing-bg p-lg-5 p-md-3 p-3">
                    <h1 className="m-0 p-0 txt-50 font-family-Sacramento txt-000 fw-400 mb-5">
                        My Settings
                    </h1>

                    {
                        apiReqs.errorMsg
                        &&
                            <div className="mb-2">
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={false} />
                            </div>
                    }

                    <div className="col-lg-7 col-md-7 col-12 mb-5">
                        <div className="mb-4">
                            <label className="font-family-poppins txt-14 fw-500 txt-000">
                                Update username
                            </label>
                            <br />
                            <div style={{ gap: '7.5px' }} className="d-flex align-items-center">
                                <input 
                                    type='text'
                                    value={usernameInput}
                                    onChange={handleUsernameInputChange}
                                    className="auth-input-field w-100"
                                    placeholder="New username...?"
                                /> 
                                <div onClick={updateUsername} style={{ padding: '10px 15px' }} className="bg-3A5B22 rounded-3 clickable">
                                    <FaScrewdriverWrench size={20} color="#FFF" />
                                </div> 
                            </div>                             
                        </div>

                        <div className="mb-4">
                            <label className="font-family-poppins txt-14 fw-500 txt-000">
                                Update email address
                            </label>
                            <br />
                            <p className="m-0 p-0 txt-000 fw-500 txt-13 font-family-SourceCodePro">
                                <span className="txt-EC2020">Disclaimer: </span>This is a portfolio project. In an actual project, a validation 
                                code will be sent to this provided email to verify if this email actually exists. For now, 
                                feel free to input any email, provided it is not attached to any other account, it should work just fine.
                            </p>
                            <div style={{ gap: '7.5px' }} className="d-flex align-items-center">
                                <input 
                                    type="email"
                                    name="email"
                                    value={emailInput}
                                    onChange={handleEmailInputChange}
                                    className="auth-input-field w-100"
                                    placeholder="New email...?"
                                /> 
                                <div onClick={updateEmail} style={{ padding: '10px 15px' }} className="bg-3A5B22 rounded-3 clickable">
                                    <FaScrewdriverWrench size={20} color="#FFF" />
                                </div> 
                            </div>                             
                        </div>                                    
                    </div>

                    <div className="py-5" />

                    <h1 className="m-0 p-0 txt-50 font-family-Sacramento txt-000 fw-400 mb-5">
                        Password Reset
                    </h1>

                    <div className="col-lg-7 col-md-7 col-12">
                        <div className="mb-4">
                            <label className="font-family-poppins txt-14 fw-500 txt-000">
                                Old password
                            </label>
                            <br />
                            <div style={{ gap: '7.5px' }} className="d-flex align-items-center w-100">
                                <div className="d-flex w-100 align-items-center bg-FFF justify-content-between auth-input-field">
                                    <input 
                                        type={oldPasswordVisible ? 'text' : 'password'}
                                        value={oldPasswordInput}
                                        onChange={handleOldPasswordInputChange}
                                        className="auth-input-field-text w-100 bg-transparent"
                                        placeholder="****************"
                                    />
                                    <div className="px-2">
                                        {
                                            oldPasswordVisible
                                            ?
                                                <FaRegEyeSlash size={20} color="#D9D9D9" className="clickable" onClick={toggleOldPasswordVisibility} />
                                            :
                                                <FaRegEye size={20} color="#D9D9D9" className="clickable" onClick={toggleOldPasswordVisibility} />
                                        }
                                    </div>
                                </div>
                                <div onClick={validateOldPassword} style={{ padding: '10px 15px' }} className="bg-3A5B22 rounded-3 clickable">
                                    <FaScrewdriverWrench size={20} color="#FFF" />
                                </div>                                
                            </div>                               
                        </div>

                        <Collapse in={showNewPasswordInput}>
                            <div className="mb-4">
                                <label className="font-family-poppins txt-14 fw-500 txt-000">
                                    New password
                                </label>
                                <br />
                                <div style={{ gap: '7.5px' }} className="d-flex align-items-center w-100">
                                    <div className="d-flex w-100 align-items-center bg-FFF justify-content-between auth-input-field">
                                        <input 
                                            type={newPasswordVisible ? 'text' : 'password'}
                                            value={newPasswordInput}
                                            onChange={handleNewPasswordInputChange}
                                            className="auth-input-field-text w-100 bg-transparent"
                                            placeholder="****************"
                                        />
                                        <div className="px-2">
                                            {
                                                newPasswordVisible
                                                ?
                                                    <FaRegEyeSlash size={20} color="#D9D9D9" className="clickable" onClick={toggleNewPasswordVisibility} />
                                                :
                                                    <FaRegEye size={20} color="#D9D9D9" className="clickable" onClick={toggleNewPasswordVisibility} />
                                            }
                                        </div>
                                    </div>
                                    <div onClick={resetPassword} style={{ padding: '10px 15px' }} className="bg-3A5B22 rounded-3 clickable">
                                        <FaScrewdriverWrench size={20} color="#FFF" />
                                    </div>                                
                                </div>                               
                            </div>                        
                        </Collapse>                        
                    </div>                    
                </div>            
            </ScrollToTop>
        </div>
    )
}