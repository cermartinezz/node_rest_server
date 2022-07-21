const jwt = require('jsonwebtoken');


const createJWT = (user) => {
  return new Promise((resolve, reject) => {

      const payload = {uid: user.id};

      jwt.sign(payload, process.env.APP_KEY, {
        expiresIn: '4h'
      }, (err, token) => {
        if(err){
          console.log(err);
          reject('there was a error creating the token')
        }

        resolve(token);
      });

  })
}


module.exports = {createJWT}