const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
 ////////////////// crud operation
// user Register 
router.post("/userRegister", userController.userRegister);
// login
router.post("/userLogin", userController.login);
// get all user
router.get("/getAllUser",userController.getUser);
// get User by Id
router.get("/getUser/:id", userController.getUserById);
// Delete User by Id

router.delete("/deleteUser/:id", userController.deleteUserId);
// update user by Id
router.patch("/updateUser/:id", userController.updateUserById);
module.exports = router;