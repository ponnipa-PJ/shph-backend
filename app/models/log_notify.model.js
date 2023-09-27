const sql = require("./db");

const Data = function (datas) {
this.permission_docs_id=datas.permission_docs_id;this.messages=datas.messages;this.created_by=datas.created_by;};
Data.create = (newData, result) => {
sql.query("INSERT INTO log_notify SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM log_notify";
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
sql.query(`SELECT * FROM log_notify WHERE id = ${id}`, (err, res) => {
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
"UPDATE log_notify SET permission_docs_id = ?,messages = ?,created_by = ? WHERE id = ?",
[datas.permission_docs_id,datas.messages,datas.created_by,id],(err, res) => {
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
"DELETE FROM log_notify  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM log_notify", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;