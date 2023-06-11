const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB Atlas")
}).catch((err) => {
    console.log(err);
})