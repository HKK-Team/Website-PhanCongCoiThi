import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function toastSuccess(massage, theme) {
  toast.success(`${massage}`, {
    position: "top-right",
    theme: theme || `colored`,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
export function toastError(massage, theme) {
  toast.error(`${massage}`, {
    position: "top-right",
    theme: theme || `colored`,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
export function toastInfor(massage, theme) {
  toast.info(`${massage}`, {
    position: "top-right",
    theme: theme || `colored`,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
export function toastPromise(promise, successCallback) {
  toast.promise(promise, {
    pending: "Please wait...",
    success: {
      render(data) {
        return successCallback(data);
      },
    },
    error: {
      render(data) {
        return JSON.stringify(data?.data?.response?.data?.msg);
      },
    },
  });
}
