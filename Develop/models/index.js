// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongsTo(Products, {
  foreignKey: 'Category_id',
});
// Categories have many Products
Categories.hasMany(Products, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Products.belongToMany(ProductTag, {
  foreignKey: 'tag_id',
});

// Tags belongToMany Products (through ProductTag)
Tags.belongToMany(ProductTag, {
  foreignKey: 'product_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
