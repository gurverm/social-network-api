const router = require('express').Router();

const{
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought
} = require("../../controllers/thoughtsController.js");


// /api/thoughts
router.route("/")
    .get(getAllThoughts)
    .post(createThought);


// /api/thoughts/thoughtId
router.route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;