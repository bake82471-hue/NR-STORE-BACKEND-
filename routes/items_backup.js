// backend/routes/items.js
const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");
const auth = require("../middleware/auth");

router.get("/", itemsController.getAll);
router.get("/:id", itemsController.getOne);
router.post("/", auth, itemsController.create);
router.put("/:id", auth, itemsController.update);
router.delete("/:id", auth, itemsController.remove);

module.exports = router;