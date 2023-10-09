module.exports = app => {
const datas = require("../controllers/history_doctor_dentist.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/getreportdoctor", datas.getreportdoctor);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/history_doctor_dentist", router);
};