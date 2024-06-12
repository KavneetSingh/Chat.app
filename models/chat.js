const mongoose= require('mongoose');


const chatSchema= new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        minLength: [1, "Message length is 0"],
        maxLength: [150, "Message length too high"]
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat= new mongoose.model("Chat", chatSchema);

module.exports= Chat;