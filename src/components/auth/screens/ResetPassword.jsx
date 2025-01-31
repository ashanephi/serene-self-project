import React, { useEffect, useState } from "react";
import logoIcon from '../../../assets/images/logos/logo-icon-only.png'
import { Formik, ErrorMessage, validateYupSchema } from 'formik'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import CustomErrorMsg from "../../customErrorMsg/CustomErrorMsg";
import * as yup from 'yup'
import '../css/auth.css'
import { PASSWORD_REGEX } from "../../regex/regex";
import ScrollToTop from "../../customScroll/ScrollToTop";
import { data, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { appLoadStart, appLoadStop } from "../../redux/slices/appLoadingSlice";
import { onRequestApi } from "../../apiRequests/requestApi";
import { showAlertMsg } from "../../redux/slices/alertMsgSLice";




export default function ResetPassword(){
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToSignUp = () => navigateTo('/')
    const goToLogin  = () => navigateTo('/login')
    const goBack = () => navigateTo(-1)

    const locationState = useLocation().state

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [passwordVisible, setPasswordVisible] = useState(false)

    useEffect(() => {
        if(!locationState || !locationState.email){
            goBack()
        }
    }, [])

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading){
            dispatch(appLoadStart())
        
        } else{
            dispatch(appLoadStop())
        }

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'resetPassword'){
                onRequestApi({
                    requestInfo,
                    successCallBack: resetPasswordSuccess,
                    failureCallback: resetPasswordFailure
                })
            }
        }
    }, [apiReqs])

    const resetPasswordSuccess = ({ result }) => {
        try {

            setApiReqs({ isLoading: false, data: null, errorMsg: null })
            goToLogin()
            dispatch(showAlertMsg({ msg: 'Password reset successful', type: 'success' }))
            
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

    const validationSchema = yup.object().shape({
        newPassword: yup
            .string()
            .matches(
                PASSWORD_REGEX,
                "New Password must be at least 11 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                )
            .required("New Password Required")
    })

    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)

    if(!locationState || !locationState.email){
        return <></>
    }

    const { email } = locationState

    return (
        <ScrollToTop
            scrollToTopCondition={apiReqs.errorMsg}
        >
            <div>
                <div className="d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                    <div className="col-lg-1 col-md-3 col-3 mb-lg-3 mb-md-4 mb-4">
                        <img src={logoIcon} className="col-lg-12 col-md-12 col-12" />
                    </div>
                </div>

                <div className="px-2 w-100">
                    <div className="mb-5">
                        <h1 className="m-0 p-0 mb-2 fw-500 font-family-poppins txt-32 txt-000">
                            Reset Your Password
                        </h1>
                        <p className="m-0 p-0 txt-000 txt-18 font-family-SourceCodePro fw-500 mb-4">
                            Enter the validation token sent to <span className="txt-3A5B22 fw-700"> { email } </span>
                        </p>
                        <p className="m-0 p-0 txt-000 txt-13 font-family-OpenSans fw-500">
                            <span className="txt-EC2020">Disclaimer:</span> <span className="txt-3A5B22 fw-600">Serene-Self</span> is a protfolio project, thus, this is a password reset simulation process. 
                            No validation token is actually being sent to the email above. Simple enter a new password to change the password tied the 
                            account registered with the email above
                        </p>
                    </div>

                    {
                        apiReqs.errorMsg
                        &&
                            <div className="py-2">
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                            </div>
                    }

                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            newPassword: ''
                        }}
                        onSubmit={(values) => {
                            return setApiReqs({ 
                                isLoading: true,
                                errorMsg: null,
                                data: {
                                    type: 'resetPassword',
                                    requestInfo: {
                                        url: 'users/reset-password',
                                        method: 'POST',
                                        data: {
                                            ...values,
                                            email
                                        }
                                    }
                                }
                            })
                        }}
                    >
                        {({ handleBlur, handleChange, handleSubmit, values, isValid, dirty }) => (
                            <div>

                                <div className="mb-5">
                                    <label className="font-family-poppins txt-14 fw-500 txt-000">
                                        New password
                                    </label>
                                    <br />
                                    <div className="d-flex align-items-center justify-content-between auth-input-field">
                                        <input 
                                            type={passwordVisible ? 'text' : 'password'}
                                            name="newPassword"
                                            value={values.newPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="auth-input-field-text w-100"
                                            placeholder="Enter your new password"
                                        />
                                        <div className="px-2">
                                            {
                                                passwordVisible
                                                ?
                                                    <FaRegEyeSlash size={20} color="#D9D9D9" className="clickable" onClick={togglePasswordVisibility} />
                                                :
                                                    <FaRegEye size={20} color="#D9D9D9" className="clickable" onClick={togglePasswordVisibility} />
                                            }
                                        </div>                                        
                                    </div>
                                    <ErrorMessage 
                                        name="newPassword" 
                                        render={
                                            errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                            } 
                                    />                                
                                </div>

                                <button 
                                    onClick={handleSubmit}
                                    type="submit"
                                    disabled={!(isValid && dirty)}
                                    style={{
                                        opacity: !(isValid && dirty) ? 0.5 : 1
                                    }}
                                    className="auth-form-submit-btn w-100 mb-5"
                                >
                                    Reset password
                                </button>                                         

                                <div className="py-3" />                     

                                <div className="d-flex mb-5 align-items-center justify-content-between w-100">
                                    <div className="w-100 auth-horizontal-line" />
                                    <div className="px-1">
                                        <p className="m-0 p-0 text-center font-family-poppins txt-11 fw-500 txt-000">
                                            Or
                                        </p>
                                    </div>
                                    <div className="w-100 auth-horizontal-line" />
                                </div>

                                <div className="py-3" />

                                <div className="auth-or-option-container mb-4">
                                    <h2 className="m-0 p-0 mb-4 font-family-SourceCodePro txt-3A5B22 fw-700 txt-22">
                                        Yet to have an account?
                                    </h2>
                                    <button 
                                        onClick={goToSignUp}
                                        className="auth-form-submit-btn w-100"
                                    >
                                        Signup
                                    </button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </ScrollToTop>
    )
}