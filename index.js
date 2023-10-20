const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const noteController = require("./controller/dbcontroller");

app.use(express.json())

app.post("/create", noteController.createUser)

app.get("/allusers", noteController.getAllUsers)

app.get("/users/:id", noteController.getOneUser)

app.put("/users/:id", noteController.updateOneUser);

app.delete("/users/:id", noteController.deleteOneUser)


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
