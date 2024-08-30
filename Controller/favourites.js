const List = require('../model/List');
const User = require('../model/user');

//  logic of Adding to favourite in  List
const addToFav = async (req, res) => {
  const { user , liked } = req.params; 
  
  try {
    // Find the user by ID
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the item is already favorited
    const isFavorited = existingUser.fav.includes(liked);
    if (isFavorited) {
      return res.status(300).json({ msg: "Already Present in Favourites Lists" });
    }

    // Add the liked item to the favorites array
    const isVailedList = await List.findById(liked);
    if (isVailedList) {
        existingUser.fav.push(liked);
        await existingUser.save();
        res.status(201).json({ msg: "Added to important List" });
    } else {
      res.status(404).json({msg:"Invailed post id"});
    } 
  } catch (error) {

    console.error(error);
    
    res.status(500).json({ msg: `Server error: ${error.message}` });
  }
};

// Removing From Favourite List

const removeToFav = async (req, res) => {

  const { user,liked } = req.params; 

  try {
    // Find the user by ID
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    existingUser.fav.pull(liked);
    await existingUser.save();

    res.status(201).json({ msg: "Removed from imporant list " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server error: ${error.message}` });
  }
};

module.exports = {
   addToFav,removeToFav}