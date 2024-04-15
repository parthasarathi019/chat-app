import { toast } from "react-toastify";

export const toastSuccess = (msg) => {
    return  toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
}

export const toastError = (msg) => {
    return toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 5000,
    })
}