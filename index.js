const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userController = require("./controller/dbcontroller");

app.use(express.json())

app.post("/create", userController.createUser)

app.get("/allusers", userController.getAllUsers)

app.get("/users/:id", userController.getOneUser)

app.put("/users/:id", userController.updateOneUser);

app.delete("/users/:id", userController.deleteOneUser)


app.post('/login', (req, res) => {
    jwt.sign({user}, 'secret', {expiresIn: '300s'}, (err, token) => {
        res.json(
            {
                token
            }
        )
    })    
})

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
