module.exports = options => {
  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    if (!token) {
      return res.status(401).send({ message: "请先登录" });
    }
    const { id } = require("jsonwebtoken").verify(token, req.app.get("secret"));
    if (!id) {
      return res.status(401).send({ message: "请先登录" });
    }
    req.user = await require("../models/User").findById(id);
    if (!req.user) {
      return res.status(401).send({ message: "请先登录" });
    }
    await next();
  };
};
