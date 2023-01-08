const { response, request } = require("express");
const { Product } = require("../models");

/**
 * get products paginated, pupulated - total
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req = request, res = response) => {
  
  const {limit = 5, from = 0} = req.query;
  const activeProducts = {status:true}

  const [products,total] = await Promise.all([
    Product.find(activeProducts)
    .skip(from)
    .limit(limit)
    .populate([{path:'user',select: 'name _id'}, {path:'category',select: 'name _id'}]),
    Product.count(activeProducts)
  ])

  res.json({
    total,products
  });


}

const getProduct = async (req = request, res = response) => {

  const product = await Product.findById(req.params.id)
                                 .populate([{path:'user',select: 'name _id'}, {path:'category',select: 'name _id'}])

  return res.json({product});
}

const createProduct = async (req = request, res = response) => {

  const {status,user,...body} = req.body;
  
  const existing_product = await Product.findOne({ name: body.name.toUpperCase() });

  if(existing_product){
    return res.status(400).json({
      msj: 'The product is already been used'
    })
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.authUser._id
  }
  

  const newProduct = new Product(data);
  await (await newProduct.save()).populate([{path:'user',select: 'name _id'}, {path:'category',select: 'name _id'}]);

  res.status(201).json(newProduct);

}

const updateProduct = async (req = request, res = response) => {

  const {id} = req.params;
  const {_id,status,user,...body} = req.body;
  const data = {
    ...body,
    name: body.name.toUpperCase()
  }

  
  const product = await Product.findByIdAndUpdate(id, data, {new: true}).populate([{path:'user',select: 'name _id'}, {path:'category',select: 'name _id'}]);

  res.json({
    product
  });

}

const deleteProduct = async (req = request, res = response) => {

  const {id} = req.params

  const product = await Product.findByIdAndUpdate(id, {status:false}, {new: true});

  res.json({product});

}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}