const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create a new thought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
           // res.json(dbThoughtData)
           return User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { thoughts: _id } },
            { new: true, runValidators: true }
        );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },

    //update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //delete a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: "No thoughts found with this Id!" });
                }
                res.json(deletedThought)
                // return User.findOneAndUpdate(
                //     { _id: params.userId },
                //     { $pull: { thoughts: params.thoughtId } },
                //     { new: true }
                // );
            })
            .catch((err) => res.json(err))
    },  

    // add a reaction
    createReaction({ params, body })  {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: "No thoughts found with this Id!"});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
    },

    //delete a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pul: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController; 