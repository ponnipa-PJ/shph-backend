const Data = require("../models/events.model.js");

exports.create = (req, res) => {
if (!req.body) {
res.status(400).send({
message: 'Content can not be empty!'
});
}

const datas = new Data({
    noti:req.body.noti,userId:req.body.userId,borderColor:req.body.borderColor,backgroundColor:req.body.backgroundColor,title:req.body.title,date:req.body.date,doctorId:req.body.doctorId,bookstatus:req.body.bookstatus,status:req.body.status,});
Data.create(datas, (err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while creating the Tutorial."
});
else res.send(data);
});
};

exports.book = (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    Data.book(name,id, (err, data) => {
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
        Data.getquebyuserid(date,id, (err, data) => {
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
        Data.getdoctorbydate(date,id, (err, data) => {
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
Data.getAll(name,id, (err, data) => {
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

