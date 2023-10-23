const pool = require("../config/dbconfig");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userExist = await pool.query(`SELECT email FROM Users WHERE Users.email='${email}';`);
    if (!userExist.rows[0]) {
      const newUser = await pool.query(`INSERT INTO Users (username, email, password) VALUES('${username}', '${email}', '${hashedPassword}');`);
      res.json(newUser.rows[0]);
      let payload = { username: username, email: email || 0 };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
      console.log(token);
      res.status(200).json({token})
    } else {
      res.status(200).json("THIS USERNAME OR PASSWORD HAS BEEN ALREADY REGISTERED");
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.loginUser = async (req, res) => {
 try{ const {username, password, email, roles} = req.body;
  const user = await pool.query(`SELECT * FROM Users WHERE username = '${username}';`);
  const validPassword = await bcrypt.compare(password, user.rows[0].password)
  if(validPassword){
    console.log(user.rows[0].roles)
    let payload = { username: username, email: email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return res.status(200).header("auth-token", token).send({ "token": token });
  } else {
    res.json('WRONG PASSWORD')
  }
}
  catch(err){
    console.log(err);
  }
}



exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM Users;");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await pool.query(`SELECT * FROM Users WHERE ID = ${id};`);
    res.json(oneUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.updateOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const updatedNote = await pool.query(
      `UPDATE Users SET Username = ${username} WHERE note_id=${id};`
    );
    res.json("USER HAS BEEN UPDATED");
  } catch (err) {
    console.error(err.message);
  }
};

exports.deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await pool.query(`DELETE FROM Users WHERE id = ${id};`);
    res.json("USER HAS BEEN DELETED");
  } catch (err) {
    console.error(err.message);
  }
};


