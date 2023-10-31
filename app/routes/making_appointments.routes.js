module.exports = app => {
const datas = require("../controllers/making_appointments.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/getreport", datas.getreport);

router.get("/getreportdoctor", datas.getreportdoctor);

router.get("/getreportdoctordentist", datas.getreportdoctordentist);

router.get("/:id", datas.findOne);

router.get("/findOnedentist/:id", datas.findOnedentist);

router.put("/:id", datas.update);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/making_appointments", router);
};
