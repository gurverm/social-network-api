const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  //   addFriend,
  //   removeFriend,
} = require("../../controllers/usersController.js");

// /api/users
router.route("/")
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId
router.route("/:userId") 
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
