import toast, { ToastOptions } from "react-hot-toast";

const useNotification = () => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  return { success, error };
};

export default useNotification;
