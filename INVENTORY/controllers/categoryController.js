const Furniture = require("../models/furniture");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");


exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({name: 1}).exec()
    const furnituresList = [];
    for(const category of allCategories){
        const furnitures = await Furniture.find({category: category._id}).sort({name: 1}).exec()
        furnituresList[category.name] = furnitures
    }
    console.log(furnituresList)
    res.render("categories", {
        title: "Categories",
        categories: allCategories,
        furnitures: furnituresList
    })
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec()
    const furnitureList = await Furniture.find({category: req.params.id}).sort({name: 1}).exec()
    res.render("category_detail", {
        title: `Category number ${req.params.id}`,
        category: category,
        furnitures: furnitureList
    })
})