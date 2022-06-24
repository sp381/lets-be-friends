const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:userId')
    .post(createThought);
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;    


