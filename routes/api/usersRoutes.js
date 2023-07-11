const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  //   addFriend,
  //   removeFriend,
} = require("../../controllers/usersController");

// /api/users
router.get("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
