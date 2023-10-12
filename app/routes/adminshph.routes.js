module.exports = app => {
const datas = require("../controllers/adminshph.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.post("/signin", datas.signin);

router.get("/", datas.findAll);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.delete("/:id/:status", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/adminshph", router);

};
