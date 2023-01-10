const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require("../models");

const collections = {
  users: User,
  categories: Category,
  products: Product,
}

const getItemFilter = (key,term) => {
  const filters = {
    users: {
      $or: [{name: term},{email: term}],
      $and: [{status: true}]
    },
    categories: {
      $or: [{name: term}],
      $and: [{status: true}]
    },
    products: {
      $or: [{name: term}],
      $and: [{status: true}]
    }
  }

  return (filters[key]) ?? null;
}


const searchItem = async (term = '', res = response, key) => {
  
  const isMongooseid = isValidObjectId(term);

  if(isMongooseid){
    const item = await collections[key].findById(term)
    return res.json({
      results: item ?? []
    })
  }

  const regex = new RegExp(term, 'i')

  const items = await collections[key].find(getItemFilter(key, regex))
  
  return res.json({
    results: items
  })
}



const search = (req = request, res = response) => {

  const { collection, term } = req.params;

  if(!collections[collection]){
    res.status(400).json({
      msj: 'collection not allowed'
    })
  }

  return searchItem(term, res, collection);


}
 
module.exports = {
  search
}