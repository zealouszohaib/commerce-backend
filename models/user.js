module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {}
  );

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: "userId" });
    // User.hasMany(models.Review, { foreignKey: "userId" }); 
  };

  return User;
};
