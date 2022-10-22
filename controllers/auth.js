const { response, json } = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify')


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

const googleSignIn = async (req, res = response) => {

  const {id_token} = req.body;

  try {

    const {name,email,img} = await googleVerify(id_token);


    let user = await User.findOne({email});

    if(!user){
      const data = {
        name,
        email,
        password: 'XD',
        img,
        role: 'USER_ROLE',
        google:  true
      }

      user = new User(data);
      await user.save();
    }

    if(!user.status){
      return res.status(401).json({
        msj: 'User blocked'
      });
    }

    const token = await createJWT(user);



    console.log(name,email,img);
    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      msg: "The token couldn't be verified"
    })
  }

  

}

module.exports = {
  login,
  googleSignIn
}