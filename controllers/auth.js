const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

  const {email, password} = req.body;


  try {

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        msj: 'password or email are wrong'
      });
    }


    if(!user.status){
      return res.status(400).json({
        msj: 'the user is not longer active'
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if(!validPassword){
      return res.status(400).json({
        msj: 'password or email are wrong'
      });
    }

    const token = await createJWT(user);


    return res.json({
      user,token
    })
    
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

module.exports = {
  login
}