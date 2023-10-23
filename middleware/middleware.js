const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");
  try {
    token = token.split(" ")[1];
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");
    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");
    req.user = verifiedUser;
    console.log(verifiedUser);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

exports.isUser = async (req, res, next) => {
  if (req.user.username == "Amu") {
    console.log(req.user.username);
    next();
  }
  return res.status(401).json("Unauthorized User!");
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.roles === 'admin') {
    next();
  }
  return res.status(401).json("Unauthorized Admin!");
};
