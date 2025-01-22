import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users:[],
    loading:false,
    error:false
}
const adminSlice =  createSlice({
    name:"admin",
    initialState,
    reducers:{
        startGetUsers:(state,action)=>{
            state.loading=true,
            state.error =false
        },
        successGetUsers:(state,action)=>{
            state.users = action.payload
            state.loading = false
            state.error =  false
        },
        failureGetUsers:(state,action)=>{
            state.loading = false
            state.error = true
        },
        updatingUser: (state,action)=>{
            const updatedUser = action.payload
            state.users.userData = state.users.userData.map((user)=>user._id===updatedUser._id?updatedUser:user)
        },
        deletingUser:(state,action)=>{
            state.users.userData = action.payload
        },
        userCreated:(state,action)=>{
            state.users.userData.push(action.payload)
        }
    }
})

export const {startGetUsers,successGetUsers,failureGetUsers,updatingUser,deletingUser,userCreated} = adminSlice.actions
export default adminSlice.reducer