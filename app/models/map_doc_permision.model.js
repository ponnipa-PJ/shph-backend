const sql = require("./db");

const Data = function (datas) {
this.permission_doc_id=datas.permission_doc_id;this.document_id=datas.document_id;this.name=datas.name;this.path=datas.path;this.status=datas.status;this.created_by=datas.created_by;};
Data.create = (newData, result) => {
sql.query("INSERT INTO map_doc_permision SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM map_doc_permision";
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
sql.query(`SELECT d.id as id ,d.name as name,md.name as name_file,md.path FROM documents d left join map_doc_permision md on md.document_id = d.id WHERE md.permission_doc_id = ${id} and md.status = 1`, (err, res) => {
if (err) {
result(err, null);
return;
}
if (res.length) {
result(null, res);
return;
}
result({ kind: "not_found" }, null);
});
};

Data.updateById = (id, datas, result) => {
sql.query(
"UPDATE map_doc_permision SET permission_doc_id = ?,document_id = ?,path = ?,status = ?,created_by = ? WHERE id = ?",
[datas.permission_doc_id,datas.document_id,datas.path,datas.status,datas.created_by,id],(err, res) => {
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
Data.remove = (id,per_id, result) => {
sql.query(
`UPDATE map_doc_permision SET status = 0 WHERE document_id = ${id} and permission_doc_id = ${per_id} `, (err, res) => {
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
sql.query("DELETE FROM map_doc_permision", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;