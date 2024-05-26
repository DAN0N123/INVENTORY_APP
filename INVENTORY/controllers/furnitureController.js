const Furniture = require("../models/furniture");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");


exports.furniture_list = asyncHandler(async (req, res, next) => {
    const allFurnitures = await Furniture.find().sort({name: 1}).exec()

    res.render("index", {
        title: "Furniture list",
        furniture_list: allFurnitures
    })
})

exports.furniture_detail = asyncHandler(async (req, res, next) => {
    const furniture = await Furniture.findById(req.params.id).exec()

    res.render("furniture_detail", {
        title: `Item number ${furniture._id}`,
        item: furniture,
    })
})