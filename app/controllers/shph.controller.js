const Data = require("../models/shph.model.js");

exports.create = (req, res) => {
if (!req.body) {
res.status(400).send({
message: 'Content can not be empty!'
});
}

const datas = new Data({
    defaultshow:req.body.defaultshow,fullname:req.body.fullname,img_path:req.body.img_path,name:req.body.name,status:req.body.status,createdBy:req.body.createdBy});
Data.create(datas, (err, data) => {
if (err)
res.status(500).send({
message:
err.message || "Some error occurred while creating the Tutorial."
});
else res.send(data);
});
};

exports.getdoctorandshphdentist = (req, res) => {
    const name = req.query.name;
    Data.getdoctorandshphdentist(name, (err, data) => {
    if (err)
    res.status(500).send({
    message:
    err.message || "Some error occurred while retrieving table."
    });
    else res.send(data);
    });
    };

exports.getdoctorandshphmasseuse = (req, res) => {
    const name = req.query.name;
    Data.getdoctorandshphmasseuse(name, (err, data) => {
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
const defaultshow = req.query.defaultshow;

Data.getAll(name,defaultshow, (err, data) => {
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

exports.updatedefaultshow = (req, res) => {
    if (!req.body) {
    res.status(400).send({
    message: 'Content can not be empty!'
    });
    }
    
    Data.updatedefaultshow(
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

