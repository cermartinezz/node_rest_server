const { Router } = require('express');
const { check } = require('express-validator');
const { validateToken, validateFields } = require('../middlewares');
const { 
  createCategory,
  getCategories,
  getCategory, 
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController'); 
const { categoryExist } = require('../helpers/validators');



const router = Router();

/**
 * get all categories
 * /api/categories
 */
router.get('/', getCategories)

/**
 * get one category by id
 * /api/categories/{id}
 */
router.get('/:id',[
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(categoryExist),
  validateFields
], getCategory)

/**
 * create one category
 * /api/categories
 */
router.post('/', [
  validateToken,
  check('name', 'The name is required').notEmpty(),
  validateFields
  ], createCategory)

/**
 * update one category by id
 * /api/categories/{id}
 */
 router.put('/:id', [
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(categoryExist),
  validateFields
 ], updateCategory)


/**
 * delete one category by id - only admin
 * /api/categories/{id}
 */
 router.delete('/:id', [
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(categoryExist),
  validateFields
], deleteCategory)



module.exports = router;