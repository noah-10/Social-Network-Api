const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

    //Get all users
    async getUsers(req, res) {
        try{
            const users = await User.find();

            return res.json(users);
        }catch(err){
            return res.json({ message: "Error getting all users", error: err })
        }
    },

    //Get a single user by id
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id : req.params.userId})
            .populate({ path: 'thoughts'})
            .populate({ path: "friends" });

            if(!user){
                return res.json({ message: "No user found with this id" });
            };

            return res.json(user);
        }catch(err){
            res.json({ message: "Error getting user", error: err });
        }
    },

    // Create a new user
    async createUser(req, res) {
        try{
            const newUser = await User.create(req.body);
            return res.json(newUser);
        }catch(err){
            res.json({ message: "Error creating new user", error: err })
        }
    },

    // Update a user by id
    async updateUser(req, res) {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {new: true}
            );

            if(!updateUser){
                return res.json({ message: "No user found with this id"})
            }

            return res.json(updateUser);
        }catch(err){
            return res.json({ message: "Error with updating user", error: err});
        }
    },

    //Delete a user by id
    async deleteUser(req, res) {
        try{
            const deleteUser = await User.deleteOne({_id: req.params.userId});

            if(!deleteUser){
                return res.json({ message: "No user found with this id" });
            };

            res.json(deleteUser)
        }catch(err){
            res.json({ message: "Error deleting user", error: err });
        }
    }
}