module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      name: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {}
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "userId" }); // Review belongs to a user
    Review.belongsTo(models.Product, { foreignKey: "productId" }); // Review belongs to a product
  };

  return Review;
};
