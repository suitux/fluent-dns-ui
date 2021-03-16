import { toast } from 'react-toastify'

export const showError = (message) => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}
