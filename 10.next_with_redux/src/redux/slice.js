import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

const Slice = createSlice({
    name: "addUser",
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log("action", action);
            
            const data = {
                id: nanoid(),
                name: action.payload
            }
            state.users.push(data);
        }
    }
})

export const {addUser} =  Slice.actions
export default Slice.reducer;