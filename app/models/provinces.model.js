const sql = require("./db");

const Data = function (datas) {
this.name_th=datas.name_th;this.name_th_short=datas.name_th_short;this.name_en=datas.name_en;this.geography_id=datas.geography_id;};
Data.create = (newData, result) => {
sql.query("INSERT INTO provinces SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM provinces";
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
sql.query(`SELECT * FROM provinces WHERE id = ${id}`, (err, res) => {
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
"UPDATE provinces SET name_th = ?,name_th_short = ?,name_en = ?,geography_id = ? WHERE id = ?",
[datas.name_th,datas.name_th_short,datas.name_en,datas.geography_id,id],(err, res) => {
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
"DELETE FROM provinces  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM provinces", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;