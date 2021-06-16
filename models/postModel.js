const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

const PostModel = mongoose.model('PostModel', postSchema);

module.exports = PostModel;