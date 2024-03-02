const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/chatmingo")
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema =  mongoose.Schema({
  endpoint: String,
  receiver: String,
  messages: Array,
  
});

const usermodel = mongoose.model("history", userSchema);

module.exports=usermodel
