module.exports = app => {
const datas = require("../controllers/events.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/deleteevent", datas.deleteevent);
router.get("/", datas.findAll);
router.get("/geteventappoint", datas.geteventappoint);

router.get("/getappoint", datas.getappoint);

router.get("/getappointbyId", datas.getappointbyId);

router.get("/geteventbydate", datas.geteventbydate);
router.get("/geteventbook", datas.geteventbook);

router.get("/createcolumn", datas.createcolumn);

router.get("/geteventbyuseranddate", datas.geteventbyuseranddate);
router.get("/geteventbydocanddate", datas.geteventbydocanddate);
router.get("/createsql", datas.createsql);

router.get("/book", datas.book);
router.get("/gettimebydoctoranddate", datas.gettimebydoctoranddate);
router.get("/getdoctorbydate", datas.getdoctorbydate);
router.get("/getquebyuserid", datas.getquebyuserid);
router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/updateconfirm/:id", datas.updateconfirm);

router.put("/updateuser/:id", datas.updateuser);

router.delete("/:id", datas.delete);

app.use("/api/events", router);
};
