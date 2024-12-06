import { Navigate, Route, Routes } from "react-router-dom";
import Login from './Pages/auth/Login';
import { useEffect } from "react";
import { Loader } from "lucide-react";
import useAuthStorage  from './storage/authenticatedUser';
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/auth/SignUp";
import Reset from "./Pages/auth/Reset";
import { Toaster } from "react-hot-toast";
import Verify from "./Pages/auth/Verify";
import ChangePassword from "./Pages/auth/ChangePassword";
import PasswordResetSuccess from "./Pages/auth/PasswordResetSuccess";
import CreateAccount from "./Pages/auth/CreateAccount";
import { StoreProvider } from './context/StoreContext.jsx'; 
import AdminPanel from "./Components/AdminPanel.jsx";
import AccountInformation from "./Components/AccountInformation.jsx";
import Services from "./Pages/Services.jsx";
import Clients from "./Pages/Clients.jsx";
import Bookings from "./Pages/Bookings.jsx";
import Messages from "./Pages/Messages.jsx";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStorage();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-blue-700 size-10" />
        </div>
      </div>
    )
  }

  return (
    <StoreProvider>
    <div className="x-overflow-hidden">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* Nested routes for AdminPanel */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="profile" element={<AccountInformation />} />
          <Route path="services" element={<Services />} />
          <Route path="clients" element={<Clients />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="create-user" element={<SignUp />} />
        </Route>

        {/* Other existing routes */}
        <Route path="/" element={<Navigate to="/admin/profile" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/reset" element={!user ? <Reset /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/verify" element={!user ? <Verify /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/changePassword" element={!user ? <ChangePassword /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/passwordResetSuccess" element={!user ? <PasswordResetSuccess /> : <Navigate to={"/admin/profile"} />} />
        <Route path="/createAccount" element={!user ? <CreateAccount /> : <Navigate to={"/admin/profile"} />} />
      </Routes>
    </div>
    </StoreProvider>
  );
};

export default App;