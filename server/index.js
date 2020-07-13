const express = require("express");

const app = express();
app.set("secret", "secretKey"); // ***
app.use(require("cors")());
app.use(express.json());
app.use("/admin", express.static(__dirname + "/dist/admin"));
app.use("/web", express.static(__dirname + "/dist/web"));
app.use("/uploads", express.static(__dirname + "/uploads"));
require("./db")(app);
require("./routes/admin")(app);
require("./routes/web")(app);

app.listen(3000, () => {
  let env = process.env.NODE_ENV || "development";
  if ("development" === env) {
    console.log("dev: http://localhost:3000");
  } else if ("production" === env) {
    console.log("prod: http://test.test.com");
  } else {
    console.log(env);
  }
});
