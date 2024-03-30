const { User, Thought } = require("../models");

module.exports = {
  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.json({ message: "No thought found with this id" });
      }

      res.json(thought);
    } catch (err) {
      res.json({ message: "Error creating reaction", error: err });
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      if (!req.params.thoughtId || !req.params.reactionsId) {
        return res.json({ message: "Please have both ids" });
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionsId }}},
        { new: true }
      );

      if (!thought) {
        return res.json({ message: "No thought found with this id" });
      }

      res.json(thought);
    } catch (err) {
      res.json({ message: "Error deleting reaction", error: err });
    }
  },
};
