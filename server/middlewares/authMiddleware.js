const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY="secret"

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send("Auth Header is missing");
    }
    const token = authorization.split(" ").pop();
    if (!token) {
      return res.status(401).send("Access Token is missing");
    }

    let decodedUser = jwt.verify(token, JWT_SECRET_KEY);

    let userInDB = await User.findById(decodedUser._id);
    
    req.user = {
      email: userInDB.email,
      userId: userInDB._id,      
    };

    next();
  } catch (err) {
    return res.status(401).send({ messege: "User is not logged In" });
  }
};


module.exports = {authMiddleware};
