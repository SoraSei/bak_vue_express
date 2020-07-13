module.exports = {
  outputDir: __dirname + "/../server/dist/admin",
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/"
};
