const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');

const { loadFiles } = require('../controllers/uploadController');



const router = Router();


/**
 * create one product
 * /api/products
 */
router.post('/', loadFiles)


module.exports = router;