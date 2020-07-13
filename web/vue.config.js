module.exports = {
  outputDir: __dirname + "/../server/dist/web",
  publicPath: process.env.NODE_ENV === "production" ? "/web/" : "/"
};
