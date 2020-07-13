module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set("useFindAndModify", false);

  // npm i require-all
  // require("require-all")(__dirname + "/models");
  // const mongoose = require("mongoose");
  // const Category = mongoose("Category");
};
