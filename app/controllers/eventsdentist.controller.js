const Data = require("../models/eventsdentist.model.js");

exports.create = (req, res) => {
if (!req.body) {
res.status(400).send({
message: 'Content can not be empty!'
});
}

const datas = new Data({
    shphId:req.body.shphId,createdBy:req.body.createdBy,confirmstatus:req.body.confirmstatus,remark:req.body.remark, noti:req.body.noti,userId:req.body.userId,borderColor:req.body.borderColor,backgroundColor:req.body.backgroundColor,title:req.body.title,date:req.body.date,doctorId:req.body.doctorId,bookstatus:req.body.bookstatus,status:req.body.status,});
Data.create(datas, (err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while creating the Tutorial."
});
else res.send(data);
});
};

exports.gettimebydoctoranddate = (req, res) => {
    const date = req.query.date;
    const id = req.query.id;
    const userid = req.query.userid;
    const shphId = req.query.shphId;
    const type = req.query.type;
    
    Data.gettimebydoctoranddate(date,id,userid,shphId,type, (err, data) => {
    if (err)
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving table."
    });
    else res.send(data);
    });
    };

exports.book = (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const shphId = req.query.shphId;
    
    Data.book(name,id,shphId, (err, data) => {
    if (err)
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving table."
    });
    else res.send(data);
    });
    };
    
    exports.createcolumn = (req, res) => {
        const name = req.query.name;
        
        Data.createcolumn(name, (err, data) => {
        if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving table."
        });
        else res.send(data);
        });
        };

        exports.createsql = (req, res) => {
            const name = req.query.name;
            Data.createsql(name, (err, data) => {
            if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving table."
            });
            else res.send(data);
            });
            };
            
            exports.geteventbook = (req, res) => {
                const id = req.query.id;
                
                Data.geteventbook(id, (err, data) => {
                if (err)
                res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving table."
                });
                else res.send(data);
                });
                };
    exports.geteventbydate = (req, res) => {
        const date = req.query.date;
        const datecurrent = req.query.datecurrent;
        
        Data.geteventbydate(date,datecurrent, (err, data) => {
        if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving table."
        });
        else res.send(data);
        });
        };

    exports.getquebyuserid = (req, res) => {
        const date = req.query.date;
        const id = req.query.id;
        const shphId = req.query.shphId;
        Data.getquebyuserid(date,id,shphId, (err, data) => {
        if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving table."
        });
        else res.send(data);
        });
        };
        exports.deleteevent = (req, res) => {
            const date = req.query.date;
            const id = req.query.id;
            Data.deleteevent(date,id, (err, data) => {
            if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving table."
            });
            else res.send(data);
            });
            };
        exports.geteventbydocanddate = (req, res) => {
            const date = req.query.date;
            const id = req.query.id;
            const shphId = req.query.shphId;
            Data.geteventbydocanddate(date,id,shphId, (err, data) => {
            if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving table."
            });
            else res.send(data);
            });
            };
        exports.geteventbyuseranddate = (req, res) => {
            const date = req.query.date;
            const id = req.query.id;
            const shphId = req.query.shphId;
            Data.geteventbyuseranddate(date,id,shphId, (err, data) => {
            if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving table."
            });
            else res.send(data);
            });
            };

    exports.getdoctorbydate = (req, res) => {
        const date = req.query.date;
        const id = req.query.id;
        const doctor = req.query.doctor;
        const shphId = req.query.shphId;
        const type = req.query.type;
        Data.getdoctorbydate(date,id,doctor,shphId,type, (err, data) => {
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
const id = req.query.id;
const shphId = req.query.shphId;
const userId = req.query.userId;
Data.getAll(name,id,shphId,userId, (err, data) => {
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
exports.updateconfirm = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.updateconfirm(
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
exports.updateuser = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.updateuser(
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
Data.remove(req.params.id,req.query.shphId, (err, data) => {
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

