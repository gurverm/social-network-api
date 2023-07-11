const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by id
  async getUserById(req, res) {
    try {
      const singleUserData = await User.findOne({
        _id: req.params.userId,
      })
      .populate("thoughts")
      .populate("friends")
      .select("-__v");
      if (!singleUserData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(singleUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // delete a user by id
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!userData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
