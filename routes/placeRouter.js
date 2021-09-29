const Router = require("express");
const router = new Router();
const placeController = require("../controllers/placeController.js");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post(
  "/",
  // checkRole("ADMIN"),
  placeController.create
);
router.get("/", placeController.getAll);
router.get("/:id", placeController.getOne);
router.delete(
  "/:id",
  //  checkRole("ADMIN"),
  placeController.delete
);
router.patch("/:id", placeController.update);
// router.get("/search", placeController.search);

module.exports = router;
