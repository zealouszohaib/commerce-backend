module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      brand: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      rating: { type: DataTypes.FLOAT, defaultValue: 0 },
      numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
      price: { type: DataTypes.FLOAT, defaultValue: 0 },
      countInStock: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {}
  );

  Product.associate = (models) => {
    Product.hasMany(models.Review, { foreignKey: "productId" }); 
    Product.belongsToMany(models.Order, {
      through: "OrderItems",
      foreignKey: "productId",
    });
  };

  return Product;
};
