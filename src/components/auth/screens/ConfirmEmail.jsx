import React, { useEffect, useState } from "react";
import logoIcon from '../../../assets/images/logos/logo-icon-only.png'
import { Formik, ErrorMessage } from 'formik'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import CustomErrorMsg from "../../customErrorMsg/CustomErrorMsg";
import * as yup from 'yup'
import '../css/auth.css'
import { PASSWORD_REGEX } from "../../regex/regex";
import ScrollToTop from "../../customScroll/ScrollToTop";
import { data, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { appLoadStart, appLoadStop } from "../../redux/slices/appLoadingSlice";
import { onRequestApi } from "../../apiRequests/requestApi";
import { showAlertMsg } from "../../redux/slices/alertMsgSLice";




export default function ConfirmEmail(){
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const navigateTo = (path, data) => navigate(path, { state: data })
    const goToSignUp = () => navigateTo('/')
    const goToResetPassword = (data) => navigateTo('/reset-password', data)

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading){
            dispatch(appLoadStart())
        
        } else{
            dispatch(appLoadStop())
        }

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'confirmEmail'){
                onRequestApi({
                    requestInfo,
                    successCallBack: confirmEmailSuccess,
                    failureCallback: confirmEmailFailure
                })
            }
        }
    }, [apiReqs])

    const confirmEmailSuccess = ({ result, requestInfo }) => {
        try {

            const { data } = requestInfo
            const { email } = data

            setApiReqs({ isLoading: false, data: null, errorMsg: null })
            goToResetPassword({ email })
            dispatch(showAlertMsg({ msg: 'Email confirmed!', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return confirmEmailFailure({ errorMsg: 'Something went wrong! Try again' })
        }
    }

    const confirmEmailFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

        return;
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email("Must be a valid email address").required("Email required"),
    })

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
                            Confirm Your Email
                        </h1>
                        <p className="m-0 p-0 txt-000 txt-18 font-family-SourceCodePro fw-500">
                            Enter the email address you used to register on <span className="txt-3A5B22 fw-700">Serene-Self</span>
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
                            email: ''
                        }}
                        onSubmit={(values) => {
                            return setApiReqs({
                                isLoading: true,
                                errorMsg: null,
                                data: {
                                    type: 'confirmEmail',
                                    requestInfo: {
                                        url: 'users/confirm-email',
                                        method: 'POST',
                                        data: values
                                    }
                                }
                            })
                        }}
                    >
                        {({ handleBlur, handleChange, handleSubmit, values, isValid, dirty }) => (
                            <div>

                                <div className="mb-5">
                                    <label className="font-family-poppins txt-14 fw-500 txt-000">
                                        Email address
                                    </label>
                                    <br />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="auth-input-field w-100"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage 
                                        name="email" 
                                        render={
                                            errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                            } 
                                    />                                
                                </div>

                                <button 
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!(isValid && dirty)}
                                    style={{
                                        opacity: !(isValid && dirty) ? 0.5 : 1
                                    }}
                                    className="auth-form-submit-btn w-100 mb-5"
                                >
                                    Send code to mail
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