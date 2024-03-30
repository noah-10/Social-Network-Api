const { User, Thought } = require('../models');

module.exports = {

    //Get all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();

            res.json(thoughts);
        }catch(err){
            res.json({ message: "Error getting thoughts", error: err});
        }
    }
}