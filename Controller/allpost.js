const User = require('../model/user');
const List = require('../model/List');

// Fetching All the Post of User
const getUserPosts = async (req, res) => {
    const { id } = req.params; // Correctly extract id from req.params

    try {
        // Find the user by id and populate the 'list' field
        const user = await User.findById(id).populate('list');

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(201).json({ posts: user.list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Server error: ${error.message}` });
    }
};


const getfavpost = async (req, res) => {
    const { id } = req.params; // Correctly extract id from req.params

    try {
        // Find the user by id and populate the 'list' field
        const user = await User.findById(id).populate('fav');

        if (!user) {
            // console.log(user.list);
            return res.status(404).json({ msg: "User not found" });
        } else {
            res.status(201).json({ posts: user.fav, msg:"not found"});
        }  
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Server error: ${error.message}` });
    }
};
module.exports={getfavpost,getUserPosts};
