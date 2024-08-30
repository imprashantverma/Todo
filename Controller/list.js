const mongoose = require('mongoose');
const User = require('../model/user');
const List = require('../model/List')
//  Creating New List
const createList = async (req,res)=> {
    // fetching email ,title , and title body
    const {title,body,time }= req.body;
    const { id } = req.params;
    try {
        // Fetching user object
        const existingUser =  await User.findById(id);
            if (existingUser) {
                let newDate ;
                if(time)
                        newDate = time;
                else 
                    newDate = Date.now();
                const task = new List({title,body,time:newDate,user:existingUser});
                await task.save();

                existingUser.list.push(task);
                await existingUser.save();

                return res.status(201).json({task});
                
            }  else {
                res.status(404).json({msg:'User Not Found'})
            }
        }   catch (error) {
            return res.status(500).json({message:`${error}`})
    }
}

// Updating existing task
const updateList = async (req, res) => {
    const { title, body ,time} = req.body;
    const { user, id } = req.params;

    try {
        // Find the user
        const existingUser = await User.findById(user);
        if (!existingUser) {
            console.log(user);
            return res.status(404).json({ msg: 'User Not Found' });
        }

        // Update the list item
        const updatedList = await List.findByIdAndUpdate(id, { title, body,time }, { new: true });
        if (!updatedList) {
           
            return res.status(404).json({ msg: 'Task not found' });
        }

        return res.status(200).json({ msg: 'Successfully Updated', updatedList });
    } catch (error) {
         // Log the error for debugging
        return res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

// Deleting List 
const deleteList = async (req, res) => {
    const { user, postId } = req.params;

    try {
        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const deletedPost = await List.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ msg: "Post not found" });
        }

        const isInList = existingUser.list.includes(postId);

        if (isInList) {
            existingUser.list.pull(postId);
            await existingUser.save();
        }

        const isInFavs = existingUser.fav.includes(postId);

        if (isInFavs) {
            existingUser.fav.pull(postId);
            await existingUser.save();
        }

        res.status(201).json({ msg: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: `Server error: ${error.message}` });
    }
};

module.exports = {
    createList,
    updateList,
    deleteList,
  };
