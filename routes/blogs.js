const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.index);
router.post("/", blogController.store);
router.get("/create", blogController.create);
router.get("/edit/:blogId", blogController.edit);
router.post("/update/:blogId", blogController.update);
router.delete("/delete/:blogId", blogController.destroy);
router.get("/:blogId", blogController.show);

module.exports = router;
