import AboutUs from "../Components/AboutUs";
import BestShots from "../Components/BestShots";
import ContactUs from "../Components/ContactUs";
import Footer from "../Components/Footer";
import Landing from "../Components/Landing";
import LogoSlider from "../Components/LogoSlider";
// import Navbar from "../Components/Navbar";
import OurServices from "../Components/OurServices";
import Slider from "../Components/Slider";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12">
      {/* <Navbar /> */}
      <Landing />
      <Slider />
      <AboutUs />
      <OurServices />
      <BestShots />
      <LogoSlider />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
