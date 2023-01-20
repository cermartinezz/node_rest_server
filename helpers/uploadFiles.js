const { v4: uuidv4 } = require('uuid');
const path = require('path');


const uploadFile = (files , folder = '', validExtensions = ['png','jpg','gif']) => {

  return new Promise((resolve, reject) => {

    let uploadPath;
    let name;

    if( !files || Object.keys(files).length === 0){
      return reject('File Uploaded to ' + uploadPath)
    }

    const { file } = files;

    const nameParts = file.name.split('.');
    const extension = nameParts.pop();


    if(!validExtensions.includes(extension)){
      return reject(`the extension ${extension} is not allowed, the allowed extions are [${validExtensions}]`);
    }

    name = `${uuidv4()}.${extension}`;
    uploadPath = path.join( __dirname , '../uploads/' ,folder, name );

    file.mv(uploadPath, (err) => {
      if(err) {

        return reject(err);

      }

      return resolve(name);
    })
  })
}

module.exports = {
  uploadFile
}