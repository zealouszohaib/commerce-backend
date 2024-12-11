module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define(
    "OrderItems",
    {
      qty: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {}
  );

  return OrderItems;
};
