const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.sendStatus(400);
        });
    },

    //find a User by the Id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.sendStatus(400);
        });
    },

    //create a new user
    createNewUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //Update a User by the Id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //Delete User  
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // Add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $addToSet: { friends: params.friendId} },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },

    //Delete friend
    removeFriend({ params}, res) {
        User.findOneAndDelete({ _id: params.friendId })
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
}