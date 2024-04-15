import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (chatId) => {
    const result = await axios.get(
      `https://chat-app-sam.vercel.app/message/${chatId}`
    );
    return result.data;
  }
);

const initialState = {
  loading: true,
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.messages = [];
        console.log(action.error.message);
      }),
      builder.addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      });
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
