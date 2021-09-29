const ApiError = require("../error/ApiError");
const { Favorites } = require("../models/models");

class FavoritesService {
  static create = async ({ message, userId, postId }) => {
    return await Favorites.create({ message, userId, postId });
  };

  static getAll = async (offset, limit, q) => {
    if (q) {
      return await Favorites.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: q + "%",
              },
            },
            {
              address: {
                [Op.iLike]: q + "%",
              },
            },
          ],
        },
        limit,
        offset,
      });
    }

    return await Favorites.findAndCountAll({ limit, offset });
  };

  static delete = async (id) => {
    const favorites = await Favorites.findOne({ where: { id } });
    if (!favorites) throw ApiError.BadRequest("Favorites not found");
    return await Favorites.destroy({ where: { id } });
  };
}

module.exports = FavoritesService;
