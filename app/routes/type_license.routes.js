module.exports = app => {
const datas = require("../controllers/type_license.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/deletetype_license/:id", datas.deletetype_license);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/type_license", router);
};
