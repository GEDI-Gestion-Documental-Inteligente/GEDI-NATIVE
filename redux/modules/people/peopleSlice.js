import { createSlice } from "@reduxjs/toolkit";
import { createPeople, getMyActivities, getPeople, searchPeopleForTerm } from "./peopleThunks";

const initialState = {
    activities: [],
    loading: 'idle',
    people: [],
    loadingPeople: 'idle',
    searchPeople:[]
}
const peopleSlice = createSlice({
    name: "people",
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
        });
        builder.addCase(getPeople.pending, (state) =>{
            state.loadingPeople = 'pendind'
        });
        builder.addCase(getPeople.fulfilled, (state, action) =>{
            state.loadingPeople = 'success';
            state.people = action.payload
        });
        builder.addCase(getPeople.rejected, (state) =>{
            state.loadingPeople = 'reject'
        });
        builder.addCase(searchPeopleForTerm.fulfilled, (state, action)=>{
            state.searchPeople = action.payload
        })
        builder.addCase(createPeople.fulfilled, (state)=>{
            state.loading = 'success'
        })
    }
})

export default peopleSlice.reducer;