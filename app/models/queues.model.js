const sql = require("./db");

const Data = function (datas) {
this.typeId=datas.typeId;this.userId=datas.userId;this.date=datas.date;this.dentistcourseId=datas.dentistcourseId;this.dentistId=datas.dentistId;this.status=datas.status;};
Data.create = (newData, result) => {
sql.query("INSERT INTO queues SET ?", newData, (err, res) => {
if (err) {
    console.log(err);
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM queues";
if (name) {
query += ` WHERE name LIKE '%${name}%'`;
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
sql.query(`SELECT * FROM queues WHERE id = ${id}`, (err, res) => {
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
"UPDATE queues SET typeId = ?,userId = ?,date = ?,dentistcourseId = ?,dentistId = ?,status = ? WHERE id = ?",
[datas.typeId,datas.userId,datas.date,datas.dentistcourseId,datas.dentistId,datas.status,id],(err, res) => {
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
"DELETE FROM queues  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM queues", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;