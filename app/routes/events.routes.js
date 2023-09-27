module.exports = app => {
const datas = require("../controllers/events.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);
router.get("/book", datas.book);
router.get("/getdoctorbydate", datas.getdoctorbydate);
router.get("/getquebyuserid", datas.getquebyuserid);
router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/updateuser/:id", datas.updateuser);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/events", router);
};
