import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

const useAuthStorage = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true});
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user:response.data.user, isSigningUp: false});
            toast.success("Account Creation Successful");
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred while attempting to signup");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set ({ isLoggingIn: true });
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
        } catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || "An error occurred while attempting to login");
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            
        } catch (error) {
            set({ isLoggingOut: false });
            // toast.error(error.response.data.message || "An error occurred while attempting to log out");
        }
    },
    authCheck: async () => {
        set ({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/authCheck");

            set({ user: response.data.user, isCheckingAuth: false })
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
            console.error(error); 
            // toast.error(error.response.data.message || "An error occurred while checking authentication");
        }
    },
}))

export default useAuthStorage;