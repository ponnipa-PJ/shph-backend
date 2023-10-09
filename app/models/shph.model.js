const sql = require("./db");

const Data = function (datas) {
this.name=datas.name;this.status=datas.status;this.createdBy=datas.createdBy};
Data.create = (newData, result) => {
sql.query("INSERT INTO shph SET ?", newData, (err, res) => {
if (err) {
    console.log(err);
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}


Data.getdoctorandshphdentist = (name, result) => {
    let query = `SELECT s.* FROM users u join eventsdentist e on u.id = e.doctorId join doctorshph d on e.doctorId = d.docrtorId join shph s on s.id = d.shphId where u.active = 1 and (u.role_id = 4 || u.role_id = 7 ) and e.status = 1 and d.status = 1 and e.date >= CURDATE() GROUP by e.shphId`;
    sql.query(query, (err, res) => {
            // for (let e = 0; e < res.length; e++) {
            //     let shph = `select s.* from eventsdentist e join shph s on e.shphId = s.id where e.doctorId = ${res[e].id} GROUP BY e.shphId`
            //     console.log(shph);
            //     sql.query(shph, (err, shphs) => {
            //         res[e].shph = shphs
            //     });
            // }
    if (err) {
    result(null, err);
    return;
    }
    setTimeout(() => {

        result(null, res);
    }, 500);
    });
    };

Data.getdoctorandshphmasseuse = (name, result) => {
    let query = "SELECT s.name,s.id FROM shph s join events e on s.id = e.shphId where s.status = 1  and e.date >= CURDATE() group by e.shphId";
    if (name) {
    query += ` WHERE status = ${name}`;
    }
    sql.query(query, (err, res) => {
    //     for (let s = 0; s < res.length; s++) {
    //         let doctors = `SELECT e.doctorId as id,u.firstname,u.lastname FROM shph s join events e on s.id = e.shphId join users u on e.doctorId = u.id WHERE e.shphId = ${res[s].id} group by e.doctorId`;
    //         sql.query(doctors, (err, doctor) => {
    //             res[s].doctors = doctor
    //         });
        // }
    if (err) {
    result(null, err);
    return;
    }
    setTimeout(() => {

        result(null, res);
    }, 500);
    });
    };

Data.getAll = (name, result) => {
let query = "SELECT * FROM shph";
if (name) {
query += ` WHERE status = ${name}`;
}
sql.query(query, (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};
Data.findById = (id, result) => {
sql.query(`SELECT * FROM shph WHERE id = ${id}`, (err, res) => {
if (err) {
result(err, null);
return;
}
if (res.length) {
result(null, res[0]);
return;
}
result({ kind: "not_found" }, null);
});
};

Data.updateById = (id, datas, result) => {
sql.query(
"UPDATE shph SET name = ? WHERE id = ?",
[datas.name,id],(err, res) => {
if (err) {
result(null, err);
return;
}
if (res.affectedRows == 0) {
result({ kind: "not_found" }, null);
return;
};result(null, { id: id, ...datas });
}
);
};
Data.remove = (id, result) => {
sql.query(
"UPDATE shph set status = 0 WHERE id = ?",id, (err, res) => {
if (err) {
result(null, err);
return;
}
if (res.affectedRows == 0) {
result({ kind: "not_found" }, null);
return;
}
result(null, res);
});
};

Data.removeAll = result => {
sql.query("DELETE FROM shph", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;