const express = require("express");
const app = express();
const userController = require("./controller/dbcontroller");
const {verifyUserToken, isUser} = require('./middleware/middleware')

app.use(express.json())

app.post("/create", userController.createUser)

app.post("/login", userController.loginUser)

app.get("/allusers",verifyUserToken, userController.getAllUsers)

app.get("/users/:id", verifyUserToken, userController.getOneUser)

app.put("/users/:id", verifyUserToken, userController.updateOneUser);

app.delete("/users/:id", verifyUserToken, userController.deleteOneUser)


app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
