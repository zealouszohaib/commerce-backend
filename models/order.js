module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      itemsPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
      taxPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
      shippingPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
      totalPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
      isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
      paidAt: DataTypes.DATE,
      isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
      deliveredAt: DataTypes.DATE,
    },
    {}
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId" }); 
    // Order.belongsToMany(models.Product, {
    //   through: "OrderItems", 
    //   foreignKey: "orderId",
    // });
  };

  return Order;
};
