const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtsData = await Thought.find({});
      res.status(200).json(thoughtsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thoughtsData = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "No thoughts found with this id!" });
      }
      res.json(thoughtsData);
    } catch (err) {
      res.send(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughtsData = await Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      });
      res.json(thoughtsData);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { thoughts: _id } },
          { new: true }
        );
      });
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "no thought found with this id!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "no thought found with this id!" });
      }
      res.json(thoughtsData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "no thought found with this id!" });
      }
      res.json(thoughtsData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "no thought found with this id!" });
      }
      res.json(thoughtsData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

};
