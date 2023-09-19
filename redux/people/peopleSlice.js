import { createSlice } from "@reduxjs/toolkit";
import { getMyActivities } from "../services/peopleThunks";

const initialState = {
    activities: [],
    loading: 'idle',
}
const peopleSlice = createSlice({
    name: "peoples",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getMyActivities.pending, (state)=>{
            state.loading = 'pending'
        })
        builder.addCase(getMyActivities.fulfilled, (state, action)=> {
            state.loading = 'succes',
            state.activities = action.payload
        })
        builder.addCase(getMyActivities.rejected, (state)=>{
            state.loading = 'failed'
        })
    }
})

export default peopleSlice.reducer;