const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;    


