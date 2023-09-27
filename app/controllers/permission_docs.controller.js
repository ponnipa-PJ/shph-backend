const Data = require("../models/permission_docs.model.js");

exports.create = (req, res) => {
if (!req.body) {
res.status(400).send({
message: 'Content can not be empty!'
});
}

const datas = new Data({
    file:req.body.file,
    file_name:req.body.file_name,
    day:req.body.day,
    company_id:req.body.company_id,
    no_route:req.body.no_route,
    no_car:req.body.no_car,
    license_no1_2:req.body.license_no1_2,
    province_license_no1:req.body.province_license_no1,
    license_no2_2:req.body.license_no2_2,
    province_license_no2:req.body.province_license_no2,
    license_no3_2:req.body.license_no3_2,
    province_license_no3:req.body.province_license_no3,
    registrar_comment:req.body.registrar_comment,request_at:req.body.request_at,request_date:req.body.request_date,request_receiver:req.body.request_receiver,write_at:req.body.write_at,write_date:req.body.write_date,name:req.body.name,relate:req.body.relate,address:req.body.address,moo:req.body.moo,soi:req.body.soi,road:req.body.road,tambon_id:req.body.tambon_id,amphur_id:req.body.amphur_id,province_id:req.body.province_id,phone:req.body.phone,type_id:req.body.type_id,number:req.body.number,license_no1:req.body.license_no1,license_no2:req.body.license_no2,license_no3:req.body.license_no3,wrongtype:req.body.wrongtype,offtrack:req.body.offtrack,outside:req.body.outside,business:req.body.business,of:req.body.of,from_date:req.body.from_date,from_time:req.body.from_time,to_date:req.body.to_date,to_time:req.body.to_time,origin:req.body.origin,stop:req.body.stop,destination:req.body.destination,stop_through:req.body.stop_through,station_master_id:req.body.station_master_id,consideration_status:req.body.consideration_status,registrar_id:req.body.registrar_id,line_at:req.body.line_at,officer_id:req.body.officer_id,status_id:req.body.status_id,updated_date:new Date(),created_by:req.body.created_by,update_by:req.body.update_by,officer_comment:req.body.officer_comment,station_master_comment:req.body.station_master_comment,office_to_operator:req.body.office_to_operator,consideration_registrar_status:req.body.consideration_registrar_status});
Data.create(datas, (err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while creating the Tutorial."
});
else res.send(data);
});
};

exports.findlast = (req, res) => {
    const name = req.query.name;
    Data.findlast(name, (err, data) => {
    if (err)
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving table."
    });
    else res.send(data);
    });
    };
    
    exports.getgroup = (req, res) => {
        const name = req.query.name;
        const year = req.query.year;
        const created_by = req.query.created_by;
        const officer_id = req.query.officer_id;
        const station_master_id = req.query.station_master_id;
        const registrar_id = req.query.registrar_id;
        const admin_id = req.query.admin_id;
        
        Data.getgroup(name,year,created_by,officer_id,station_master_id,registrar_id,admin_id, (err, data) => {
        if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving table."
        });
        else res.send(data);
        });
        };
exports.findAll = (req, res) => {
const name = req.query.name;
const year = req.query.year;
const created_by = req.query.created_by;
const officer_id = req.query.officer_id;
const station_master_id = req.query.station_master_id;
const registrar_id = req.query.registrar_id;
Data.getAll(name,year,created_by,officer_id,station_master_id,registrar_id, (err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while retrieving table."
});
else res.send(data);
});
};
exports.findOne = (req, res) => {
Data.findById(req.params.id, (err, data) => {
if (err) {
if (err.kind === "not_found") {
res.send([])
}
} else res.send(data);
});
};


exports.senttooperator = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.senttooperator(
    req.params.id,
    new Data(req.body),
    (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
    res.send([]);
    }
    } else res.send(data);
    }
    );
    };

exports.sendtoregistrar = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.sendtoregistrar(
    req.params.id,
    new Data(req.body),
    (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
    res.send([]);
    }
    } else res.send(data);
    }
    );
    };
exports.sendtostationmaster = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.sendtostationmaster(
    req.params.id,
    new Data(req.body),
    (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
    res.send([]);
    }
    } else res.send(data);
    }
    );
    };

exports.commenttooperator = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.commenttooperator(
    req.params.id,
    new Data(req.body),
    (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
    res.send([]);
    }
    } else res.send(data);
    }
    );
    };
    

    exports.updatedoc = (req, res) => {
        if (!req.body) {
        res.status(400).send({
        message: 'Content can not be empty!'
        });
        }
        
        Data.updatedoc(
        req.params.id,
        new Data(req.body),
        (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
        res.send([]);
        }
        } else res.send(data);
        }
        );
        };
exports.update = (req, res) => {
if (!req.body) {
res.status(400).send({
message: 'Content can not be empty!'
});
}

Data.updateById(
req.params.id,
new Data(req.body),
(err, data) => {
if (err) {
if (err.kind === "not_found") {
res.send([]);
}
} else res.send(data);
}
);
};

exports.delete = (req, res) => {
Data.remove(req.params.id, (err, data) => {
if (err) {
if (err.kind === "not_found") {
res.send([])
}
} else res.send({ message: `Data was deleted successfully!` });
});
};

exports.deleteAll = (req, res) => {
Data.removeAll((err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while removing all tutorials."
});
else res.send({ message: `All Datas was deleted successfully!` });
});
};

