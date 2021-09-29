const Router = require("express");
const router = new Router();
const placeRouter = require("./placeRouter.js");
const typeRouter = require("./typeRouter.js");
const userRouter = require("./userRouter.js");
const commentsRouter = require("./commentsRouter");
const favoritesRouter = require("./favoritesRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/place", placeRouter);
router.use("/comments", commentsRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
