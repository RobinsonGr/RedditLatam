import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../services/api";

export const fetchComments = createAsyncThunk('commentsSlice/getComments', async ({sub, card}, thunkAPI ) => {

    const allComments = await getComments({sub, card})
    return {card, comments: allComments}
})

const commentsSlice = createSlice({
    name: 'commentSlice',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            const {card, comments} = action.payload;
            state[card] = comments;
        })
    }
})

export const commentsSelector = (state) => {

    return state.commentsSlice
}

export default commentsSlice.reducer;

