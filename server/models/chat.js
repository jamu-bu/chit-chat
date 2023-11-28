const {Schema, model} = require('mongoose')

const chatSchema = new Schema ({
    text: {
        type: Array,
    },
    user1: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    user2: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;