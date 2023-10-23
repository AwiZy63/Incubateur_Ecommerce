const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authenticateUser.middleware");

router.post("/signup", userController.SignUp);
router.post("/signin", userController.SignIn);
router.post("/signout", userController.SignOut);
router.post("/check", userController.CheckAccessToken);

// Secure routes
router.patch("/update", authenticateUser, userController.UpdateUserData);
router.patch("/update/password", authenticateUser, userController.UpdateUserPassword);
router.post("/get", authenticateUser, userController.GetUserData);

module.exports = router;