import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatList } from "../redux/features/chatSlice";

const useChat = () => {
  const chatList = useSelector((state) => state.chatListReducer.chatList);
  const chatlistLoading = useSelector((state) => state.chatListReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatList());
  }, []);

  return { chatList, chatlistLoading };
};

export default useChat;
