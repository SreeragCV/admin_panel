const pool = require("../config/dbconfig")

exports.createUser = async(req, res) => {
    try {
        const { username, emailid } = req.body;
        const newUser = await pool.query(`INSERT INTO Users (username, email ) VALUES('${username}', '${emailid}');`)
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}


exports.getAllUsers = async(req,res) => {
    try {
        const allUsers =  await pool.query("SELECT * FROM Users;");
        res.json(allUsers.rows);
        
    } catch (err) {
        console.error(err.message)
    }
}


exports.getOneUser = async(req,res) => {
    try {
        const { id } = req.params;
        const oneUser =  await pool.query(`SELECT * FROM Users WHERE ID = ${id};`);
        res.json(oneUser.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
}


exports.updateOneUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {username} = req.body
        const updatedNote = await pool.query(`UPDATE Users SET Username = ${username} WHERE note_id=${id};`)
        res.json("User has been updated")
    } catch (err) {
        console.error(err.message)
        
    }
};



exports.deleteOneUser = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query(`DELETE FROM Users WHERE = ${id};`);
        res.json("User has been deleted");
    } catch (err) {
        console.error(err.message)   
    }
}