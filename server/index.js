const express = require("express");
const path = require("path");
const userController = require("./controllers/Users");

const app = express();
const port = 3000;

app
  .use(function(req, res, next) {
    // Logging

    console.log({
      params: req.params,
      body: req.body,
      url: req.url,
      query: req.query,
      headers: req.headers
    });
    next();
  })
  .use("/static", express.static(path.join(__dirname, "../NoFramework")))

  .get("/", (req, res) => res.send("Hello New Paltz!"))
  .get("/heb", function(req, res) {
    res.send({ msg: "Shalom World!" });
  })
  .use("/users", userController);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
