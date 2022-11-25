const { response } = require("express");


const isAdmin = (req, res = response, next) => {

  const authUser = req.authUser;

  if(!authUser){
    return res.status(500).json({msj:"call token validation"});
  }

  if(authUser.role !== 'ADMIN_ROLE'){
    return res.status(401).json({msj:"Auth user is not an admin"});
  }


  next();
}


const hasRole = (...roles) => {
  return (req, res = response, next) => {
    const authUser = req.authUser;

    if(!authUser){
      return res.status(500).json({msj:"call token validation"});
    }

    if(!roles.includes(authUser.role)){
      return res.status(401).json({msj:`Auth user doesn't have one of this roles ${roles}`});
    }



    next();
  }
}


module.exports = {isAdmin,hasRole}