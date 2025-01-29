const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //validate input 
        if(!username || !email || !password){
            return res.status(400).json({success : false, message : 'Invalid input. Username, email and password are required'});
        }

        //check if user is already exists
        const existingUser = await User.findOne({email});

        // If the email already exists, return an error
        if(existingUser) {
            return res.status(400).json({success: false, message : 'User already exists'});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user
        const newUser = await User.create({ username, email, password: hashedPassword});

        // Exclude password field from user object
        const userWithoutPassword = { ...newUser._doc };
        delete userWithoutPassword.password;

        res.status(201).json({
            message: "User Created successfully",
            data: userWithoutPassword,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

//login
exports.login = async(req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({email: email});
    
        if(!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    
        //Generate Jwt Token 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    
        // Exclude password field from user object
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
    
         // Set the token in the cookie with the same expiration time
         res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000), // Same expiration time as the JWT
            // secure: true, // This ensures the cookie is sent only over HTTPS
        });
    
        // Send a success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}