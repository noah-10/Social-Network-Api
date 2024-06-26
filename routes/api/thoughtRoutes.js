const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtsController");
const { createReaction, deleteReaction } = require('../../controllers/reactionController');

// api/thoughts
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// api/thoughts/thoughtId/reactions/:reactionsId
router.route("/:thoughtId/reactions/:reactionsId").delete(deleteReaction);

module.exports = router;
