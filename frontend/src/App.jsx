import { Route, Routes } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import Home from "./Pages/Home";
import Booking from "./Pages/Booking";
import Navbar from "./Components/Navbar";
import BookingSummary from "./Pages/BookingSummary";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import AllFashionPhotos from "./Pages/AllFashionPhotos";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment";
import Portfolio from "./Pages/Portfolio";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <StoreContextProvider>
      <div className="w-full font-poppins">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingSummary" element={<BookingSummary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/allFashionPhotos" element={<AllFashionPhotos />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <Toaster />
        {/* <Footer /> */}
      </div>
    </StoreContextProvider>
  );
}

export default App;
