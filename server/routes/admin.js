module.exports = (app) => {
  const router = require("express").Router({ mergeParams: true });

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  });
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const queryOpt = {};
    if (req.Model.modelName === "Category") {
      queryOpt.populate = "parent";
    }
    const list = await req.Model.find().setOptions(queryOpt).limit(100);
    res.send(list);
  });

  const authMid = require("../mid/auth");
  const resourceMid = require("../mid/resource");

  app.use("/admin/api/rest/:resource", authMid(), resourceMid, router);

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../uploads" });

  // npm i multer-aliyun-oss
  // const MAO = require("multer-aliyun-oss");
  // const upload = multer({
  //   storage: MAO({
  //     config: {
  //       region: "<region>",
  //       accessKeyId: "<accessKeyId>",
  //       accessKeySecret: "<accessKeySecret>",
  //       bucket: "<bucket>"
  //     }
  //   })
  // });

  app.post(
    "/admin/api/upload",
    authMid(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      // file.url = `http://localhost:3000/uploads/${file.filename}`; // oss含url
      let env = process.env.NODE_ENV || "development";
      if ("development" === env) {
        file.url = `http://localhost:3000/uploads/${file.filename}`;
      } else if ("production" === env) {
        file.url = `http://test.test.com/uploads/${file.filename}`;
      } else {
        console.log(env);
      }
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await require("../models/User")
      .findOne({ username })
      .select("+password");
    if (!user) {
      return res.status(422).send({ message: "用户不存在" });
    }
    const isValid = require("bcrypt").compareSync(password, user.password);
    if (!isValid) {
      return res.status(422).send({ message: "密码错误" });
    }
    const token = require("jsonwebtoken").sign(
      { id: user._id },
      app.get("secret")
    );
    // res.send({ user, token });
    res.send({ token });
  });
  app.get("/admin/api/user", authMid(), async (req, res) => {
    res.send(req.user);
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
