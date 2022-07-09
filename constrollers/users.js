const { response, request } = require('express');



const usuariosGet = (req, res = response) => {
  res.json({
    ok: true,
    msj: 'get api - controller'
  });
}

const usuarioPost = (req = request, res = response) => {
  const body = req.body;
  res.json(body);
}

const usuarioPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    ok: true,
    msj: 'put api - controller',
    id
  });
}

const usuarioDelete = (req, res = response) => {
  res.json({
    ok: true,
    msj: 'delete api - controller'
  });
}


module.exports = {
  usuariosGet, usuarioPost, usuarioPut, usuarioDelete
}