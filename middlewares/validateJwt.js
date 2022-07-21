const { request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/users')


const validateToken = async (req = request, res, next) => {

  const token = req.header('x-token')
  console.log(token)

  if(!token){
    return res.status(401).json({msj: "token is needed"})
  }

  try {
    const {uid} = jwt.verify(token, process.env.APP_KEY);

    const authUser = await User.findById(uid);

    if(!authUser){
      return res.status(401).json({msj: "Auth user does not exist"})
    }

    if(!authUser.status){
      return res.status(401).json({msj: "Auth user is not longer active"})
    }
    
    req.authUser = authUser;
    next();
  } catch (error) {
    return res.status(401).json({msj: "Invalid token"})
  }

}


module.exports = {
  validateToken
}