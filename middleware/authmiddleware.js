const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Check if the token is in cookies
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object for use in the next middleware or route handler
        req.user = decoded;

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;
