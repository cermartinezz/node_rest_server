const { request, response } = require("express");
const { uploadFile } = require("../helpers");



const loadFiles = async (req = request, res = response) => {

  
  try{
    const path = await uploadFile(req.files,'images') 
    return res.json({
      path
    })
  }catch (err){
    return res.status(400).json({
      msj:err
    })
  }
  

}



module.exports = {
  loadFiles
}