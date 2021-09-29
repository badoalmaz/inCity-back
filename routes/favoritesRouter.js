const Router = require("express");
const router = new Router();
const FavoritesController = require("../controllers/favoritesController");

router.post("/", FavoritesController.create);
router.get("/", FavoritesController.getAll);
router.delete("/:id", FavoritesController.delete);

module.exports = router;
