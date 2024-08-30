const User = require('../model/user');
const bcrypt = require('bcryptjs');

// Creating New User

const signup = async (req, res) => {
    try {
        // Fetching email, username, and password from the request body
        const { name,email, password } = req.body;

        // Checking if all required fields are provided
        if (email && name && password) {
            // Checking if the email already exists in the database
            const alreadyUser = await User.findOne({ email });
            if (alreadyUser) {
                return res.status(400).json({ msg: "Email already in use" });
            } else {
                // Hashing the password for extra security
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name :name, email:email,password:hashedPassword});
                await newUser.save();
                return res.status(201).json({ msg: `Signup successful ` });
            }
        } else {
            return res.status(400).json({ msg: 'Please fill in all the details' });
        }
    } catch (err) {
        return res.status(500).json({ msg: `Error while signing up: ${err.message}` });
    }
};


module.exports = signup;
