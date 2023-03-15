import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    value: 1
    
}


export const counterSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.value = action.payload
        }
       
    }
});

export const {setActive} = counterSlice.actions;
export default counterSlice.reducer;