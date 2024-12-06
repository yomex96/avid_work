

// controllers/bankInfoController.js
import BankInfo from '../models/bank.js';

// Create new bank information
export const createBankInfo = async (req, res) => {
  try {
    const bankInfo = new BankInfo(req.body);
    await bankInfo.save();
    return res.status(201).json(bankInfo);
  } catch (error) {
    console.error('Error creating bank info:', error);
    res.status(500).json({ message: 'Error creating bank info', error });
  }
};


// Get all bank information
export const getAllBankInfo = async (req, res) => {
  try {
    const bankInfoList = await BankInfo.find();
    return res.json(bankInfoList);
  } catch (error) {
    console.error('Error fetching bank info:', error);
    res.status(500).json({ message: 'Error fetching bank info', error });
  }
};





// Update bank information or create a new one if it doesn't exist
export const updateBankInfo = async (req, res) => {
  try {
    // Check if the account number already exists in a different record
    const existingBankInfo = await BankInfo.findOne({
      accountNumber: req.body.accountNumber,
      _id: { $ne: req.params.id } // Ensure it’s not the same document
    });

    if (existingBankInfo) {
      return res.status(400).json({
        message: 'Account number already exists.',
        error: 'Duplicate account number error',
      });
    }

    // Proceed with update or insert if no duplicate found
    const updatedBankInfo = await BankInfo.findOneAndUpdate(
      { _id: req.params.id || {} }, // Use ID if provided, otherwise match any
      req.body,
      { new: true, upsert: true, runValidators: true } // Upsert to create if not found
    );

    res.status(200).json(updatedBankInfo);
  } catch (error) {
    console.error('Error updating bank info:', error);
    res.status(500).json({ message: 'Error updating bank info', error });
  }
};



// Delete all bank information
export const deleteAllBankInfo = async (req, res) => {
  try {
    await BankInfo.deleteMany();
    return res.json({ message: 'All bank information deleted successfully' });
  } catch (error) {
    console.error('Error deleting all bank info:', error);
    res.status(500).json({ message: 'Error deleting all bank info', error });
  }
};



// // PUT: Update Bank Details
// export const updateBankInfo = async (req, res) => {
//   const { id, accountName, bankName, swiftCode, accountNumber } = req.body; // Changed bankSwiftCode to swiftCode

//   try {
//     // Validate that all required fields are provided
//     if (!id || !accountName || !bankName || !swiftCode || !accountNumber) {
//       return res.status(400).json({ error: 'All fields are required' }); // Bad Request
//     }

//     // Find the bank info by ID and update it
//     const updatedBankInfo = await Bank.findByIdAndUpdate(
//       id,
//       { accountName, bankName, bankSwiftCode: swiftCode, accountNumber }, // Map swiftCode to bankSwiftCode
//       { new: true, runValidators: true } // Return the updated document and run validators
//     );

//     // Check if the bank information was found and updated
//     if (!updatedBankInfo) {
//       return res.status(404).json({ error: 'Bank information not found' }); // Not Found
//     }

//     // Return a success response with the updated bank info
//     res.status(200).json({ message: 'Bank information updated successfully!', bankInfo: updatedBankInfo });
//   } catch (error) {
//     // Log the error stack for better debugging
//     console.error('Error updating bank information:', error.stack || error);

//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message }); // Bad Request
//     }

//     // Handle duplicate key error for accountNumber
//     if (error.code === 11000 && error.keyPattern && error.keyPattern.accountNumber) {
//       return res.status(409).json({ error: 'Account number already exists.' }); // Conflict
//     }

//     // Handle unexpected errors
//     res.status(500).json({ error: 'An unexpected server error occurred.' }); // Internal Server Error
//   }
// };






// // POST: Create or Add Bank Details
// export const addBankInfo = async (req, res) => {
//   const { accountName, bankName, swiftCode, accountNumber } = req.body;

//   try {
//     // Create a new bank info entry
//     const bankInfo = new Bank({ // Corrected from Payment to Bank
//       accountName,
//       bankName,
//       swiftCode,
//       accountNumber,
//     });

//     await bankInfo.save(); // Save the bank info to the database
//     res.status(201).json({ message: 'Bank information added successfully!', bankInfo });
//   } catch (error) {
//     console.error('Error adding bank information:', error);
//     res.status(500).json({ error: 'Server error.' });
//   }
// };