const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/users");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", UserController.get_all_users);

router.post("/signup", UserController.user_sign_up);

router.post("/login", UserController.user_login);

// router.post("/", upload.single("userImage"), (req, res) => {
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     username: req.body.username,
//     password: req.body.password,
//     userImage: req.file.path
//   });
//   user
//     .save()
//     .then(result => {
//       console.log(result);
//       res.status(201).json({
//         message: "Handling POST requests for /users",
//         createdUser: result
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.get("/:userId", UserController.get_user);

router.patch("/:userId", UserController.change_user_info);

router.delete("/:userId", checkAuth, UserController.delete_user);

// router.delete("/:userId", (req, res, next) => {
//   const id = req.params.userId;
//   User.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted",
//         request: {
//           type: "POST",
//           url: "http://localhost:3000/users",
//           body: { username: "String", password: "String" }
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// });

module.exports = router;
