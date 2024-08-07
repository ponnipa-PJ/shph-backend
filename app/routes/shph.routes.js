module.exports = app => {
const datas = require("../controllers/shph.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/getdoctorandshphmasseuse", datas.getdoctorandshphmasseuse);

router.get("/getdoctorandshphdentist", datas.getdoctorandshphdentist);


router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/updatedefaultshow/:id", datas.updatedefaultshow);



router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/shph", router);
};
