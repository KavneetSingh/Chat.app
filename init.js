const mongoose= require('mongoose');
const Chat= require("./models/chat.js")


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
    .then(res=>{
        console.log("connection established");
    })
    .catch(err=>{
        console.log(err);
    })


Chat.insertMany(
    [
        {
            from: "Neha",
            to: "Preet",
            message: "Can you pl send me the notes from yesterday's class",
            created_at: new Date()
        },
        {
            from: "Prayag",
            to: "Justin",
            message: "Teach me JS callbacks",
            created_at: new Date()
        },
        {
            from: "Amit",
            to: "Sumit",
            message: "All the best for your game! :)",
            created_at: new Date()
        },
        {
            from: "Anita",
            to: "Ramesh",
            message: "Pick some candies on your way back",
            created_at: new Date()
        }
    ]
).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})