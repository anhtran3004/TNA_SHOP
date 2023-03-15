import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    value: ''
    
}


export const blobSlice = createSlice({
    name: 'blob',
    initialState,
    reducers: {
        setBlob: (state, action) => {
            state.value = action.payload
        }
       
    }
});

export const {setBlob} = blobSlice.actions;
export default blobSlice.reducer;