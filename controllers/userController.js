const { response, request } = require('express');
const User = require('../models/users')
const bcrypt = require('bcryptjs');




const usuariosGet = async (req = request, res = response) => {

  const {limit = 5, from = 0 } = req.query;
  const activeUsers = {status:true}


  const [users,total] = await Promise.all([
    User.find(activeUsers)
      .skip(from)
      .limit(limit),
    User.count(activeUsers)
  ])

  res.json({
    total,users
  });
}

const usuarioPost = async (req = request, res = response) => {
  const body = req.body;

  const { name, email, password, role } = body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password,salt);

  await user.save();

  res.json({user});
}

const usuarioPut = async (req, res = response) => {
  const {id} = req.params;
  const {_id,password, google, ...data} = req.body;

  if(password) {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(password,salt);
  }

  const user = await User.findByIdAndUpdate(id, data, {new: true});

  res.json({
    user
  });
}



const usuarioDelete = async (req = request, res = response) => {

  const {id} = req.params

  const user = await User.findByIdAndUpdate(id, {status:false}, {new: true});
  const authUser = req.authUser;

  res.json(user);
}


module.exports = {
  usuariosGet, usuarioPost, usuarioPut, usuarioDelete
}