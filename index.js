const express= require("express");
const app= express();
const path= require('path');
const mongoose= require('mongoose');
const port= 3000;
const Chat= require("./models/chat.js")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

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


// let chat1= new Chat({
//     from: "Adam",
//     to: "Eve",
//     message: "Hi! Haven't seen you in a long time",
//     created_at: new Date()
// });

// chat1.save()
//     .then(res=>{
//         console.log(res);
//     })
//     .catch(err=>{
//         console.log(err);
//     })


app.listen(port, (req,res)=>{
    console.log("server running");
});

app.get("/", (req,res)=>{
    res.send("req sent");
});

app.get("/chats", async (req,res)=>{
    let chats= await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
    // for(let i=0;i<chats.length;i++){
    //     console.log(chats[i].message);
    // }
});

app.get("/chats/new", (req,res)=>{
    res.render("newChat.ejs");
});

app.post("/chats", (req,res)=>{
    // console.log(req.body);
    let {from, to , message}= req.body;
    let date= new Date();
    // console.log(date);
    let newChat= new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    // console.log(newChat);
    newChat.save().then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async(req,res)=>{
    let {id}= req.params;
    // console.log(id);
    let data= await Chat.findById(id);
    // console.log(data);
    res.render("edit.ejs",{data});
})

app.patch("/chats/:id", (req,res)=>{
    // console.log("patch req------------------------------------------------>");
    let {id}= req.params;
    let {message}= req.body;
    // console.log(id);
    // console.log(message);
    Chat.updateOne({_id: id}, {message: message}, {runValidators:true, new: true}).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/chats");
});

app.delete("/chats/:id", (req,res)=>{
    let {id}= req.params;
    console.log(id);
    Chat.deleteOne({_id:id}).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/chats");
});