module.exports = app => {
const datas = require("../controllers/map_events.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/geteventbycreatedBy", datas.geteventbycreatedBy);

router.get("/findbyuserId/:id", datas.findbyuserId);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/updateconfirm/:id", datas.updateconfirm);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/map_events", router);
};
