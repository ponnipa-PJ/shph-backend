const sql = require("./db");

const Data = function (datas) {
this.docrtorId=datas.docrtorId;this.shphId=datas.shphId;this.status=datas.status;};
Data.create = (newData, result) => {
sql.query("INSERT INTO doctorshph SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getdoctorandshphmasseuse = (roleId,userId, result) => {
    let query = ''
    if (roleId) {
    query += `SELECT * FROM users u where u.active = 1 and u.role_id = 1`;
    }
    if (userId) {
        query += `SELECT s.* FROM doctorshph d join shph s on d.shphId = s.id where d.docrtorId = ${userId} and d.status = 1`;
        }
        console.log(query);
    sql.query(query, (err, res) => {
        if (roleId) {
            for (let e = 0; e < res.length; e++) {
                let shph = `SELECT s.* FROM doctorshph d join shph s on d.shphId = s.id where d.docrtorId = ${res[e].id} and d.status = 1`
                sql.query(shph, (err, shphs) => {
                    res[e].shph = shphs
                });
            }
        }
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
let query = "SELECT d.*,s.name FROM doctorshph d join shph s on d.shphId = s.id";
if (name) {
query += ` WHERE docrtorId = ${name}`;
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
sql.query(`SELECT * FROM doctorshph WHERE id = ${id}`, (err, res) => {
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
"UPDATE doctorshph SET status = ? WHERE id = ?",
[datas.status,id],(err, res) => {
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
"DELETE FROM doctorshph  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM doctorshph", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;