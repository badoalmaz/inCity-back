class FavoritesController {
  static create = async (req, res, next) => {
    try {
      let { message, favoritesId, placeId } = req.body;
      const favoritesData = { message, favoritesId, placeId };
      await FavoritesService.create(favoritesData);
      return res.json({ message: "favorites created" });
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      let { page, limit, q } = req.query;
      page = page || 1;
      limit = limit || 5;
      const offset = page * limit - limit;

      const favorites = await FavoritesService.getAll(offset, limit, q);

      return res.json(favorites);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      await FavoritesService.delete(id);

      return res.json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = FavoritesController;
