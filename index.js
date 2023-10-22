const express = require("express");
const app = express();
const userController = require("./controller/dbcontroller");

app.use(express.json())

app.post("/create", userController.createUser)

app.post("/login", userController.loginUser)

app.get("/allusers", userController.getAllUsers)

app.get("/users/:id", userController.getOneUser)

app.put("/users/:id", userController.updateOneUser);

app.delete("/users/:id", userController.deleteOneUser)


app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
