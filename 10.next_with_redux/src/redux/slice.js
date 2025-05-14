import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

const Slice = createSlice({
    name: "addUser",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const data = {
                id: nanoid(),
                name: action.payload
            }
            state.users.push(data);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
})

export const {addUser, removeUser} =  Slice.actions
export default Slice.reducer;