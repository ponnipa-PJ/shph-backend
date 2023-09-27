module.exports = app => {
const datas = require("../controllers/permission_docs.controller.js");

var router = require("express").Router();

router.post("/", datas.create);

router.get("/", datas.findAll);

router.get("/getgroup", datas.getgroup);

router.get("/findlast", datas.findlast);

router.get("/:id", datas.findOne);

router.put("/:id", datas.update);

router.put("/updatedoc/:id", datas.updatedoc);

router.put("/commenttooperator/:id", datas.commenttooperator);

router.put("/sendtostationmaster/:id", datas.sendtostationmaster);

router.put("/sendtoregistrar/:id", datas.sendtoregistrar);

router.put("/senttooperator/:id", datas.senttooperator);

router.delete("/:id", datas.delete);

router.delete("/", datas.deleteAll);

app.use("/api/permission_docs", router);
};
