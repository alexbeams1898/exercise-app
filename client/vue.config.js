const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "/users": {
        target: "http://localhost:3000"
      },
      "/exercises": {
        target: "http://localhost:3000"
      }
    }
  }
};
