import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;


// // Import jwt if not done already
// import jwt from 'jsonwebtoken';

// const authenticate = (req, res, next) => {
//   // Check if the token is in cookies or headers, handling undefined cases
//   const token = req.cookies?.authToken || req.headers.authorization?.split(' ')[1];

//   // If no token is found, deny access
//   if (!token) {
//     return res.status(403).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     // Verify token with JWT secret from environment variables
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token.' });
//   }
// };

// export default authenticate;

