const { Router } = require('express');
const { check } = require('express-validator');
const { validateToken, validateFields } = require('../middlewares');
const { 
  createProduct,
  getProducts,
  getProduct, 
  updateProduct,
  deleteProduct
} = require('../controllers/productController'); 
const { productExist } = require('../helpers/validators');



const router = Router();

/**
 * get all products
 * /api/products
 */
router.get('/', getProducts)

/**
 * get one product by id
 * /api/products/{id}
 */
router.get('/:id',[
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(productExist),
  validateFields
], getProduct)

/**
 * create one product
 * /api/products
 */
router.post('/', [
  validateToken,
  check('name', 'The name is required').notEmpty(),
  check('price', 'The price is required').notEmpty(),
  check('price','The price must be numeric').isNumeric(),
  check('description', 'The description is required').notEmpty(),
  check('category', 'The category is required').notEmpty(),
  check('category', 'The category must be valid').isMongoId(),
  validateFields
  ], createProduct)

/**
 * update one product by id
 * /api/products/{id}
 */
 router.put('/:id', [
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(productExist),
  check('category', 'The category must be valid').isMongoId(),
  validateFields
 ], updateProduct)


/**
 * delete one category by id - only admin
 * /api/categories/{id}
 */
 router.delete('/:id', [
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(productExist),
  validateFields
], deleteProduct)



module.exports = router;