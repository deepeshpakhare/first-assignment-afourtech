const mongoose = require("mongoose");
const category = require("./models/category");

const insertCategory = async (categoryName,user_id) => {
    if (await doesCategoryExistAlready(categoryName,user_id)) {
      throw "Category already exists"
    }
    var newCategory = new category();
    newCategory.category_name = categoryName;
    newCategory.user_id = user_id;
    var createdCategory = await newCategory.save();
    if (createdCategory != null) {
      return createdCategory;
    }
    throw "Failed to create category";
}

const doesCategoryExistAlready = async (nameOfCategory,user_id) => {
    var doc = await category.findOne({category_name:nameOfCategory,user_id:user_id});
    if (doc != null) {
      return true;
    }
    return false;
}

const getUserCategories = async (user_id) => {
    var doc = await category.find({'user_id':user_id});
    return doc;
}

const getCategory = async (category_id) => {
  var doc = await category.findById(category_id);
  return doc;
}

module.exports = {
    "insertCategory":insertCategory,
    "getUserCategories":getUserCategories,
    "getCategory":getCategory
}