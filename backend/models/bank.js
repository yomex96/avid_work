// models/BankInfo.js
import mongoose from 'mongoose';

const bankInfoSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  bankName: { type: String, required: true },
  bankSwiftCode: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('BankInfo', bankInfoSchema);



// import mongoose from 'mongoose';

// const bankSchema = new mongoose.Schema({
//   accountName: {
//     type: String,
//     required: true,
//   },
//   bankName: {
//     type: String,
//     required: true,
//   },

//   swiftCode: {
//     type: String,
//     required: true,
//   },

//   // bankSwiftCode: {
//   //   type: String,
//   //   required: true,
//   // },
//   accountNumber: {
//     type: String,
//     required: true,
//     unique: true, 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now, 
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now, 
//   },
// });

// // Add a pre-save hook to update the updatedAt field
// bankSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Bank = mongoose.model('Bank', bankSchema);
// export default Bank;





// import mongoose from 'mongoose';

// const bankSchema = new mongoose.Schema({
//   accountName: {
//     type: String,
//     required: true,
//   },
//   bankName: {
//     type: String,
//     required: true,
//   },
//   swiftCode: {
//     type: String,
//     required: true,
//   },
//   accountNumber: {
//     type: String,
//     required: true,
//     unique: true, // Ensure account number uniqueness if needed
//   },
// });

// const Bank = mongoose.model('Bank', bankSchema);
// export default Bank;
