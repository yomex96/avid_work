import ContactUs from "../Components/ContactUs"
import Footer from "../Components/Footer"

const ContactUsPage = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col justify-center text-center items-center my-24">
        <h2 className="font-bold text-3xl">
          We've Been Waiting To Hear <br /> From You!
        </h2>
        <p className="text-sm">Contact us right away.</p>
      </div>

      <ContactUs />
      <Footer />
    </div>
  )
}

export default ContactUsPage;