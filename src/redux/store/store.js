import { configureStore } from "@reduxjs/toolkit";
import chatListReducer from "../features/chatSlice";
import messageReducer from "../features/messageSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
    name: "user",
    reducer: {
        userReducer,
        chatListReducer,
        messageReducer,
    },
});

export default store;