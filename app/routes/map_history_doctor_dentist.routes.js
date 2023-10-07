module.exports = app => {
    const datas = require("../controllers/map_history_doctor_dentist.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", datas.create);
    
    router.get("/", datas.findAll);
    
    router.get("/:id", datas.findOne);
    
    router.put("/:id", datas.update);
    
    router.put("/updatestatus/:id", datas.updatestatus);
    
    router.put("/updateno/:id", datas.updateno);
    
    router.delete("/:id", datas.delete);
    
    router.delete("/", datas.deleteAll);
    
    app.use("/api/map_history_doctor_dentist", router);
    };
    