const bcrypt = require('bcryptjs');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

// User login
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(404).json({ msg: "User Doesn't Exist" });
        }

        const match = await bcrypt.compare(password, existUser.password);

        if (match) {
            const key = "prashant";  // Ideally, store this key in an environment variable for security.
            const payload = { email: existUser.email, id: existUser._id }; // Avoid sending password in payload.
           
            const token = jwt.sign(payload, key, { expiresIn: "1m" });
            existUser.token = token;

            // Create a new user object excluding the password and including the token
            const oldUser = Object.assign({}, existUser.toObject(), { token });

            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie expiration to 24 hours from now.
                httpOnly: true, // Secure the cookie.
            };

            return res.cookie("token", token, options).status(201).json({
                msg: 'Login Successful',
                id: existUser._id,
                name: existUser.name,
                user: oldUser,
            });

        } else {
            return res.status(401).json({ msg: 'Wrong Password' });
        }

    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

module.exports = Login;
