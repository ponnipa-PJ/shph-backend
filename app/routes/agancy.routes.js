module.exports = app => {
const datas = require("../controllers/agancy.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/:id", datas.findOne);
router.put("/updateAgencyActivate/:id", datas.updateAgencyActivate);

router.put("/:id", datas.update);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/agancy", router);
};
