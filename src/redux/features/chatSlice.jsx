import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChatList = createAsyncThunk(
  "user/fetchChatList",
  async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await axios.get("https://chat-app-sam.vercel.app/chat", {
          headers: {
            Authorization: token,
          },
        });

        if (result.status === 200) {
          const chatList = result.data;
          return chatList;
        }
      }
    } catch (error) {
      return [];
    }
  }
);

const initialState = {
  loading: true,
  chatList: [],
};

const chatSlice = createSlice({
  name: "userList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChatList.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchChatList.rejected, (state) => {
        state.loading = false;
        state.chatList = [];
      }),
      builder.addCase(fetchChatList.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      });
  },
  reducers: {
    addChatList: (state, action) => {
      state.chatList.push(action.payload);
    },
  },
});

export const { addChatList } = chatSlice.actions;

export default chatSlice.reducer;
