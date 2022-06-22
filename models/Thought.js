const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
})
{
    toJSON: {
        getters: true
    }
}

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            reuired: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // use ReactionSchema to validate data for a reaction (replies)
        reactions: [ReactionSchema]
    },
        {
            toJSON: {
                getters: true,
                virtuals: true
            },
            id: false
        },
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;


