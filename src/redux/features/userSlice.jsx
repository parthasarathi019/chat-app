import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const result = await axios.get(
        "https://chat-app-sam.vercel.app/user/info",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (result.status === 200) {
        const user = result.data;
        return user;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
});

const initialState = {
  loading: true,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
    },

    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
