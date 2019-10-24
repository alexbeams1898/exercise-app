const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "/users": {
        target: "http://localhost:8080"
      },
      "/exercises": {
        target: "http://localhost:8080"
      }
    }
  }
};
