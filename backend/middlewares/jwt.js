import jwt from 'jsonwebtoken';

// Secret key to sign the JWT (store it securely)
const JWT_SECRET = 'your-secret-key'; 

// Function to generate JWT token
export const generateToken = (userId, email) => {
  const payload = { userId, email }; // Payload can include user data
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }); // Token expires in 1 hour
};
