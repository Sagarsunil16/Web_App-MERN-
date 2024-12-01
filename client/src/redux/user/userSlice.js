import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:false
}

const userSlice = createSlice({
    name:'user',
    initialState ,
    reducers:{
        signInStart:(state)=>{
            state.loading =  true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        updateProfileStart:(state)=>{
            state.loading = true
        },
        updateProfileSuccess:(state,action)=>{
            state.currentUser= {...state.currentUser,...action.payload}
            state.loading = false,
            state.error =  false
        },
        updateProfileFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
        deleteUserStart:(state)=>{
            state.loading = true
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser = null
            state.loading =false,
            state.error = false
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,updateProfileStart,updateProfileSuccess,updateProfileFailure,signOut,deleteUserStart,deleteUserSuccess,deleteUserFailure} = userSlice.actions
export default userSlice.reducer