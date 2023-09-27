module.exports = app => {
const datas = require("../controllers/map_doc_permision.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.delete("/:id/:per_id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/map_doc_permision", router);
};
