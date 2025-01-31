import { configureStore } from '@reduxjs/toolkit'
import appLoadingSlice from './slices/appLoadingSlice'
import alertMsgSlice from './slices/alertMsgSlice'
import userDetailsSlice from './slices/userDetailsSlice'


export default configureStore({
    reducer: {
        appLoadingSlice,
        alertMsgSlice,
        userDetailsSlice
    }
})