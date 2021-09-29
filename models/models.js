const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Favorites = sequelize.define("favorites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Comments = sequelize.define("comments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.TEXT },
});

const Place = sequelize.define("place", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  averageBill: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.STRING, defaultValue: 0 },
  type: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

User.hasMany(Comments);
Comments.belongsTo(User);

Place.hasMany(Comments);
Comments.belongsTo(Place);

User.hasMany(Favorites);
Favorites.belongsTo(User);

Place.hasMany(Favorites);
Favorites.belongsTo(Place);

module.exports = {
  User,
  Favorites,
  Place,
  Comments,
};
