const { 
  Category,
  Role, 
  User 
} = require('../models');


const roleExist = async (role = '') => {
  const roleExist = await Role.exists({role})
  if(!roleExist){ 
    throw new Error(`The role ${role} does not exist` );
  }
}

const emailExist = async (email = '') => {
  const userExist = await User.exists({email})
  if(userExist){ 
    throw new Error(`The email ${email} is already taken` );
  }
}

const userExist = async (id = '') => {
  const userExist = await User.findById(id)
  if(!userExist){ 
    throw new Error(`There is not user with id ${id}` );
  }
}

const categoryExist = async (id = '') => {
  const categoryExist = await Category.findById(id)
  if(!categoryExist){ 
    throw new Error(`There is not category with id ${id}` );
  }
}

module.exports = {
  roleExist,
  emailExist,
  userExist,
  categoryExist
}
