import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true }, // Store formatted date as a string
  time: { type: String, required: true }, // Store time as a string
  isUnread: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;



// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;

