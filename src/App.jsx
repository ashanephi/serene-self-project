import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import AuthRouter from './components/auth/router/AuthRouter'
import './App.css'
import FullScreenLoading from './components/loaders/FullScreenLoading'
import AlertMsg from './components/alertMsg/AlertMsg'
import MainRouter from './components/main/router/MainRouter'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsState, setUserDetails } from './components/redux/slices/userDetailsSlice'
import { appLoadStart, appLoadStop } from './components/redux/slices/appLoadingSlice'
import { onRequestApi } from './components/apiRequests/requestApi'
import { showAlertMsg } from './components/redux/slices/alertMsgSLice'
import LoadWaiting from './components/loaders/LoadWaiting'





function App() {
  const dispatch = useDispatch()

  const details = useSelector(state => getUserDetailsState(state).details)

  const [apiReqs, setApiReqs] = useState({
    isLoading: true, 
    errorMsg: null, 
    data: {
      type: 'initialFetch',
      requestInfo: {
        url: 'users/get-single-user',
        method: 'POST',
        data: {
          user_id: localStorage.getItem('user_id')
        },
        token: localStorage.getItem('accessToken')
      }
    }
  })

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if(isLoading){
      dispatch(appLoadStart())
    
    } else{
      dispatch(appLoadStop())
    }

    if(isLoading && data){
      const { type, requestInfo } = data

      if(type == 'initialFetch'){
        onRequestApi({
          requestInfo,
          successCallBack: initialFetchSuccess,
          failureCallback: initialFetchFailure
        })
      }
    }
  }, [apiReqs])


  const initialFetchSuccess = ({ result }) => {
    try {

      const { data } = result
      const { details, accessToken, entries } = data

      setApiReqs({ isLoading: false, data: null, errorMsg: null })

      dispatch(setUserDetails({ details, accessToken, entries }))

      return;
      
    } catch (error) {
      return initialFetchFailure({ errorMsg: 'Automatic login failed. Login manually' })
    }
  }

  const initialFetchFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, data: null, errorMsg })
    // dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))

    return;
  }

  return (
    <HashRouter>

      <FullScreenLoading />

      <AlertMsg />

      {
        apiReqs.isLoading
        ?
          <LoadWaiting />
        :
        details
        ?
          <MainRouter />
        :
          <AuthRouter />        
      }

    </HashRouter>
  )
}

export default App
