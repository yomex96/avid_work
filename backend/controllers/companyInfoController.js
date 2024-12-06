import CompanyInfo from '../models/CompanyInfo.js';

// Update company info (Admin only)
export const updateCompanyInfo = async (req, res) => {
  try {
    const updatedInfo = await CompanyInfo.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true }
    );
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating company info', error });
  }
};

// Fetch company info
export const getCompanyInfo = async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    res.status(200).json(companyInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company info', error });
  }
};


// Delete all company info (Admin only)
export const deleteAllCompanyInfo = async (req, res) => {
  try {
    const result = await CompanyInfo.deleteMany({});
    res.status(200).json({ message: 'All company info deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company info', error });
  }
};
