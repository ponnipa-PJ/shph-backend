module.exports = app => {
const datas = require("../controllers/doctors.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/:id", datas.findOne);

router.get("/gettimebydoctor/:id", datas.gettimebydoctor);

router.put("/:id", datas.update);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/doctors", router);
};
