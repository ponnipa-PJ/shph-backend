const sql = require("./db");

const Data = function (datas) {
this.code=datas.code;this.name_th=datas.name_th;this.name_en=datas.name_en;this.province_id=datas.province_id;};
Data.create = (newData, result) => {
sql.query("INSERT INTO amphures SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM amphures";
if (name) {
query += ` WHERE province_id = ${name}`;
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
sql.query(`SELECT * FROM amphures WHERE id = ${id}`, (err, res) => {
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
"UPDATE amphures SET code = ?,name_th = ?,name_en = ?,province_id = ? WHERE id = ?",
[datas.code,datas.name_th,datas.name_en,datas.province_id,id],(err, res) => {
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
"DELETE FROM amphures  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM amphures", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;