import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema({
  profileName: { type: String, required: true }, // New field for profile name
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  about: { type: String },
  social: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter:{ type: String },
  }
});

const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);

export default CompanyInfo;

  
// const companyInfoSchema = new mongoose.Schema({
  
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   about: { type: String },
//   social: {
//     facebook: { type: String },
//     instagram: { type: String },
//     linkedin: { type: String }
//   }
// });



// import mongoose from 'mongoose';

// const companyInfoSchema = new mongoose.Schema({
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   social: {
//     facebook: { type: String },
//     instagram: { type: String },
//     linkedin: { type: String }
//   }
// });

// const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);

// export default CompanyInfo;



