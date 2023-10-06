const sql = require("./db");

const Data = function (datas) {
this.historyuserdentistId=datas.historyuserdentistId;this.name=datas.name;this.status=datas.status;this.no=datas.no;};
Data.create = (newData, result) => {
sql.query("INSERT INTO map_history_doctor_masseuse SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM map_history_doctor_masseuse";
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
sql.query(`SELECT * FROM map_history_doctor_masseuse WHERE id = ${id}`, (err, res) => {
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
"UPDATE map_history_doctor_masseuse SET historyuserdentistId = ?,name = ?,status = ?,no = ? WHERE id = ?",
[datas.historyuserdentistId,datas.name,datas.status,datas.no,id],(err, res) => {
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
"DELETE FROM map_history_doctor_masseuse  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM map_history_doctor_masseuse", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;