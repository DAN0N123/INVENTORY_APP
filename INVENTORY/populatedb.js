#!/usr/bin/env node

console.log(
  'This script populates some test categories and furniture items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/furniture_store?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const async = require('async');

const Category = require('./models/category');
const Furniture = require('./models/furniture');

const categories = [];
const furnitures = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createFurniture();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function furnitureCreate(index, name, category, price, number_in_stock) {
  const description = generateDescription(name);
  const long_description = generateLongDescription(name);
  const furniture = new Furniture({
    name: name,
    category: category,
    description: description,
    long_description: long_description,
    price: price,
    number_in_stock: number_in_stock,
  });
  await furniture.save();
  furnitures[index] = furniture;
  console.log(`Added furniture: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(0, 'Living Room', 'Furniture items for the living room.'),
    categoryCreate(1, 'Bedroom', 'Furniture items for the bedroom.'),
    categoryCreate(2, 'Office', 'Furniture items for the office.'),
  ]);
}

async function createFurniture() {
  console.log('Adding furniture items');
  await Promise.all([
    furnitureCreate(0, 'Sofa', categories[0], 499.99, 10),
    furnitureCreate(1, 'Armchair', categories[0], 299.99, 5),
    furnitureCreate(2, 'Coffee Table', categories[0], 199.99, 7),
    furnitureCreate(3, 'TV Stand', categories[0], 249.99, 3),
    furnitureCreate(4, 'Bookshelf', categories[0], 149.99, 8),
    furnitureCreate(5, 'Bed Frame', categories[1], 399.99, 6),
    furnitureCreate(6, 'Nightstand', categories[1], 99.99, 12),
    furnitureCreate(7, 'Dresser', categories[1], 349.99, 4),
    furnitureCreate(8, 'Wardrobe', categories[1], 599.99, 2),
    furnitureCreate(9, 'Desk', categories[2], 299.99, 7),
    furnitureCreate(10, 'Office Chair', categories[2], 199.99, 10),
    furnitureCreate(11, 'Filing Cabinet', categories[2], 149.99, 6),
    furnitureCreate(12, 'Conference Table', categories[2], 799.99, 1),
    furnitureCreate(13, 'Bookshelf', categories[2], 129.99, 8),
    furnitureCreate(14, 'Dining Table', categories[0], 499.99, 2),
    furnitureCreate(15, 'Dining Chair', categories[0], 299.99, 4),
    furnitureCreate(16, 'Recliner', categories[0], 399.99, 3),
    furnitureCreate(17, 'Console Table', categories[0], 179.99, 5),
    furnitureCreate(18, 'Ottoman', categories[0], 99.99, 8),
    furnitureCreate(19, 'Bedside Table', categories[1], 89.99, 10),
  ]);
}

function generateDescription(name) {
switch(name) {
  case 'Sofa':
    return 'A luxurious sofa designed for comfort and style.';
  case 'Armchair':
    return 'An elegant armchair perfect for cozy evenings.';
  case 'Coffee Table':
    return 'A sleek coffee table that enhances any living space.';
  case 'TV Stand':
    return 'A modern TV stand with ample storage.';
  case 'Bookshelf':
    return 'A versatile bookshelf for organizing your favorite reads.';
  case 'Bed Frame':
    return 'A sturdy bed frame for restful nights.';
  case 'Nightstand':
    return 'A practical nightstand to keep essentials within reach.';
  case 'Dresser':
    return 'A spacious dresser for storing clothing and accessories.';
  case 'Wardrobe':
    return 'A stylish wardrobe to elevate your bedroom decor.';
  case 'Desk':
    return 'A functional desk for productive work sessions.';
  case 'Office Chair':
    return 'An ergonomic office chair for long hours of comfort.';
  case 'Filing Cabinet':
    return 'A durable filing cabinet for organizing documents.';
  case 'Conference Table':
    return 'A large conference table for productive meetings.';
  case 'Dining Table':
    return 'An elegant dining table for family gatherings.';
  case 'Dining Chair':
    return 'Comfortable dining chairs for enjoyable meals.';
  case 'Recliner':
    return 'A plush recliner for ultimate relaxation.';
  case 'Console Table':
    return 'A versatile console table for entryways or living rooms.';
  case 'Ottoman':
    return 'A stylish ottoman that doubles as extra seating or a footrest.';
  case 'Bedside Table':
    return 'A compact bedside table to complement your bed.';
  default:
    return '';
}}

function generateLongDescription(name) {
  switch(name) {
    case 'Sofa':
      return `Indulge in unparalleled comfort with our luxurious ${name.toLowerCase()}. Crafted with the finest materials, this sofa offers both style and relaxation. Whether you're lounging with loved ones or enjoying a quiet evening alone, its plush cushions and elegant design create a cozy atmosphere in any living space.`;
    case 'Armchair':
      return `Elevate your relaxation experience with our exquisite ${name.toLowerCase()}. Designed for both comfort and sophistication, this armchair is the perfect addition to any corner of your home. Sink into its soft upholstery and unwind after a long day, or enjoy intimate conversations in its inviting embrace.`;
    case 'Coffee Table':
      return `Transform your living room with our modern ${name.toLowerCase()}. Sleek lines and a minimalist design make this coffee table a striking focal point in any contemporary space. Its ample surface area provides the perfect platform for displaying decor or enjoying cozy evenings with your favorite book and a cup of coffee.`;
    case 'TV Stand':
      return `Organize your entertainment essentials with our stylish ${name.toLowerCase()}. Featuring sleek lines and ample storage options, this TV stand combines functionality with modern design. Keep your media devices, DVDs, and more neatly tucked away while adding a touch of sophistication to your living room.`;
    case 'Bookshelf':
      return `Discover the perfect blend of form and function with our versatile ${name.toLowerCase()}. Crafted to showcase your favorite reads and decorative accents, this bookshelf adds character to any room. With its adjustable shelves and durable construction, it's an essential piece for organizing and displaying your cherished collections.`;
    case 'Bed Frame':
      return `Create a serene retreat with our sturdy ${name.toLowerCase()}. Designed for both comfort and durability, this bed frame provides the perfect foundation for restful nights. Its timeless design effortlessly complements any bedroom decor, while its solid construction ensures years of peaceful sleep.`;
    case 'Nightstand':
      return `Add convenience and style to your bedside with our practical ${name.toLowerCase()}. With its compact design and ample storage, this nightstand keeps your essentials within arm's reach while you unwind. Whether storing nighttime reads or a glass of water, it's the perfect companion for a restful night's sleep.`;
    case 'Dresser':
      return `Maximize storage without compromising style with our spacious ${name.toLowerCase()}. Featuring ample drawers and a sleek design, this dresser offers the perfect solution for organizing clothing and accessories. Its timeless appeal and durable construction make it a versatile addition to any bedroom.`;
    case 'Wardrobe':
      return `Elevate your bedroom storage with our stylish ${name.toLowerCase()}. Designed to seamlessly blend functionality with elegance, this wardrobe offers ample space for your clothing and accessories. Its sophisticated design and quality craftsmanship make it a statement piece in any bedroom.`;
    case 'Desk':
      return `Boost your productivity with our functional ${name.toLowerCase()}. Whether working from home or tackling creative projects, this desk provides a spacious surface and organized storage options. With its sleek design and sturdy construction, it's the perfect workspace for achieving your goals.`;
    case 'Office Chair':
      return `Experience comfort and support during long work hours with our ergonomic ${name.toLowerCase()}. Designed to promote proper posture and reduce fatigue, this office chair combines style with functionality. Its adjustable features and plush padding ensure a comfortable seating experience throughout the day.`;
    case 'Filing Cabinet':
      return `Stay organized and efficient with our durable ${name.toLowerCase()}. Featuring multiple drawers and a sturdy construction, this filing cabinet offers ample space for storing and organizing your important documents. Keep your workspace tidy and clutter-free with this essential office accessory.`;
    case 'Conference Table':
      return `Facilitate productive meetings with our spacious ${name.toLowerCase()}. Designed for both style and functionality, this conference table provides ample seating and a sleek surface for collaborative discussions. Its impressive design and quality craftsmanship make it the focal point of any conference room.`;
    case 'Dining Table':
      return `Gather your loved ones around our elegant ${name.toLowerCase()} for memorable meals and gatherings. Crafted with attention to detail and timeless design, this dining table sets the stage for shared moments and meaningful conversations. Its sturdy construction ensures years of enjoyment and cherished memories.`;
    case 'Dining Chair':
      return `Enhance your dining experience with our comfortable ${name.toLowerCase()}. Designed for both style and comfort, these dining chairs provide the perfect balance of support and elegance. Whether hosting dinner parties or enjoying family meals, they offer a stylish and inviting seating option.`;
    case 'Recliner':
      return `Unwind in luxurious comfort with our plush ${name.toLowerCase()}. Featuring sumptuous padding and a reclining mechanism, this chair offers the ultimate relaxation experience. Whether watching your favorite movie or taking a well-deserved nap, it's the perfect spot to kick back and relax.`;
    case 'Console Table':
      return `Make a statement in your entryway or living room with our versatile ${name.toLowerCase()}. With its slim profile and elegant design, this console table adds both style and functionality to any space. Whether displaying decor or providing additional storage, it's a versatile piece for your home.`;
    case 'Ottoman':
      return `Add versatility and style to your living space with our chic ${name.toLowerCase()}. Whether used as a footrest, extra seating, or a makeshift table, this ottoman is as functional as it is fashionable. Its elegant design and plush upholstery make it a must-have addition to any room.`;
    case 'Bedside Table':
      return `Complete your bedroom oasis with our compact ${name.toLowerCase()}. Featuring a sleek design and convenient storage options, this bedside table adds both style and functionality to your sleep space. Keep nighttime essentials within reach while enhancing your bedroom decor with this essential piece.`;
    default:
      return '';
  }
}


  