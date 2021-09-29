const Router = require("express");
// const commentsController = require("../controllers/commentsController");
const router = new Router();
const CommentsController = require("../controllers/commentsController");

router.post("/", CommentsController.create);
router.get("/", CommentsController.getAll);
router.delete("/:id", CommentsController.delete);

module.exports = router;
