const sql = require("./db");

const Data = function (datas) {
this.zip_code=datas.zip_code;this.name_th=datas.name_th;this.name_en=datas.name_en;this.amphure_id=datas.amphure_id;};
Data.create = (newData, result) => {
sql.query("INSERT INTO districts SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM districts";
if (name) {
query += ` WHERE amphure_id = ${name}`;
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
sql.query(`SELECT * FROM districts WHERE id = ${id}`, (err, res) => {
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
"UPDATE districts SET zip_code = ?,name_th = ?,name_en = ?,amphure_id = ? WHERE id = ?",
[datas.zip_code,datas.name_th,datas.name_en,datas.amphure_id,id],(err, res) => {
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
"DELETE FROM districts  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM districts", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;