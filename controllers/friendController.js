const { User }  = require('../models');

module.exports = {

    // Add a friend
    async addFriend(req, res) {
        try{

            // Checks if both ids are in request
            if(!req.params.userId || !req.params.friendId){
                return res.json({ message: "Both user Ids are required" });
            };

            // Check if user is already in the friends list
            const user = await User.findById(req.params.userId);

            if(user.friends.includes(req.params.friendId)){
                return res.json({ message: "Friend is already added" });
            }

            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: {friends: req.params.friendId }},
                { new: true }
            );

            return res.json({ friends: newFriend.friends});
        }catch(err){
            return res.json({ message: "Error adding friend", error: err });
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try{

            // Checks if both ids are in request
            if(!req.params.userId || !req.params.friendId){
                return res.json({ message: "Both user Ids are required" });
            };

            const deleteFriend = await User.findOneAndUpdate(
                { _id : req.params.userId},
                { $pull : { friends: req.params.friendId }},
                { new: true }
            );
            
            res.json(deleteFriend);
        }catch(err){
            res.json({ message: "Error deleting friend", error: err});
        }
    }
}