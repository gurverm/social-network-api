const { Thoughts } = require("../models");

module.exports = {
  //get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtsData = await Thoughts.find({});
      res.status(200).json(thoughtsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thoughtsData = await Thoughts.findOne({
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
      const thoughtsData = await Thoughts.create(req.body);
      res.json(thoughtsData);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
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
      const thoughtsData = await Thoughts.findOneAndUpdate(
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
};
