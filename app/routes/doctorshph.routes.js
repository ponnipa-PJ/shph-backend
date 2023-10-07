module.exports = app => {
const datas = require("../controllers/doctorshph.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/getdoctorandshphmasseuse", datas.getdoctorandshphmasseuse);

router.get("/getdoctorandshpdentist", datas.getdoctorandshpdentist);


router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/doctorshph", router);
};
