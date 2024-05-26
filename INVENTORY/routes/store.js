const express = require("express");
const router = express.Router();

const furnitureController = require('../controllers/furnitureController')
const categoryController = require('../controllers/categoryController')

router.get('/', furnitureController.furniture_list)

router.get('/categories', categoryController.category_list)

router.get('/furniture/:id', furnitureController.furniture_detail)

router.get('/category/:id', categoryController.category_detail)






module.exports = router;