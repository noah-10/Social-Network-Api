const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");
const { addFriend, deleteFriend } = require('../../controllers/friendController');

// /api/user
router.route("/").get(getUsers).post(createUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
