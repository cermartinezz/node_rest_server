const { response, request } = require("express");
const { Category } = require("../models");

/**
 * get categories paginated, pupulated - total
 * @param {*} req 
 * @param {*} res 
 */
const getCategories = async (req = request, res = response) => {
  
  const {limit = 5, from = 0} = req.query;
  const activeCategories = {status:true}

  const [categories,total] = await Promise.all([
    Category.find(activeCategories)
    .skip(from)
    .limit(limit)
    .populate('user'),
    Category.count(activeCategories)
  ])

  res.json({
    total,categories
  });


}

const getCategory = async (req = request, res = response) => {

  const category = await Category.findById(req.params.id)
                                 .populate({path:'user',select: 'name _id'})

  return res.json({category});
}

const createCategory = async (req = request, res = response) => {

  const name = req.body.name.toUpperCase();
  
  const existing_category = await Category.findOne({ name });

  if(existing_category){
    return res.status(400).json({
      msj: 'The category is already been used'
    })
  }
  
  const data = {
    name,
    user: req.authUser._id
  }

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);

}

const updateCategory = async (req = request, res = response) => {

  const {id} = req.params;
  const {_id,status,user,...data} = req.body;
  
  const category = await Category.findByIdAndUpdate(id, data, {new: true});

  res.json({
    category
  });

}

const deleteCategory = async (req = request, res = response) => {

  const {id} = req.params

  const category = await Category.findByIdAndUpdate(id, {status:false}, {new: true});

  res.json({category});

}

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}