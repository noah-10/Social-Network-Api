const { User, Thought } = require("../models");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      res.json({ message: "Error getting thoughts", error: err });
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.json({ message: "No user found with this id" });
      }

      res.json(thought);
    } catch (err) {
      res.json({ message: "Error getting thought", error: err });
    }
  },

  // Create thought
  async createThought(req, res) {
    try {
      // Creates new thought
      const newThought = await Thought.create(req.body);

      // Gets the thoughts username
      const username = newThought.username;

      // Adds the thought to the user
      const addToUser = await User.findOneAndUpdate(
        { username: username },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.json({ thought: newThought, user: addToUser });
    } catch (err) {
      res.json({ message: "Error creating new thought", error: err });
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!updateThought) {
        return res.json({ message: "No thought found with this id" });
      }

      res.json(updateThought);
    } catch (err) {
      res.json({ message: "Error updating thought", error: err });
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      // Find thought
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.json({ message: "No thought found with this id" });
      }

      // Updates user before deleting thought
      const updateUser = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete thought
      const deleteThought = await Thought.deleteOne({
        _id: req.params.thoughtId,
      });

      res.json(deleteThought);
    } catch (err) {
      res.json({ message: "Error deleting thought", error: err });
    }
  },
};
