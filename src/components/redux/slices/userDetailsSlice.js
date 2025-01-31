import { createSlice } from '@reduxjs/toolkit'


const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        details: null,
        entries: [],
        accessToken: null
    },
    reducers: {
        setUserDetails: (state, action) => {
            
            // details
            if(action.payload.details){
                state.details = action.payload.details
            }

            //entries
            if(action.payload.entries){
                state.entries = action.payload.entries
            }

            //accessToken
            if(action.payload.accessToken){
                state.accessToken = action.payload.accessToken
            }
        },
        clearUserDetails: (state) => {
            state.details = null,
            state.entries = [],
            state.accessToken = null
        }
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer