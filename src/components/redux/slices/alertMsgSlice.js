import { createSlice } from "@reduxjs/toolkit"


const alertMsgSlice = createSlice({
    name: 'alertMsgSlice',
    initialState: {
        msg: null,
        type: null
    },
    reducers: {
        showAlertMsg: (state, action) => {
            const { msg, type } = action.payload

            state.msg = msg
            state.type = type
        },
        
        hideAlertMsg: (state, action) => {
            state.msg = null,
            state.type = null
        }
    }
})


export const { showAlertMsg, hideAlertMsg } = alertMsgSlice.actions

export const getAlertMsgState = state => state.alertMsgSlice

export default alertMsgSlice.reducer