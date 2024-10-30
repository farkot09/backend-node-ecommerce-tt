const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUser);
router.post("/user/register", UserController.registerUser);
router.post("/user/login", UserController.loginUser);
router.post("/user/logout", UserController.logOutUSer);
router.put("/user/update/:id", UserController.updateUser);
router.put("/user/updatePassword/:id", UserController.updatePassword);
router.delete("/user/:id", UserController.deleteUSer);

module.exports = router;