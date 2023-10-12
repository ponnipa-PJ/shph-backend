const sql = require("./db");

const Data = function (datas) {
this.shphId=datas.shphId;this.score=datas.score;this.suggestion=datas.suggestion;this.status=datas.status;};
Data.create = (newData, result) => {
sql.query("INSERT INTO evaluation SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
    
let query = "SELECT * FROM evaluation";
if (name) {
query += ` WHERE shphId = ${name}`;
}
// console.log(query);
sql.query(query, (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};
Data.findById = (id, result) => {
sql.query(`SELECT * FROM evaluation WHERE id = ${id}`, (err, res) => {
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
"UPDATE evaluation SET shphId = ?,score = ?,suggestion = ?,status = ? WHERE id = ?",
[datas.shphId,datas.score,datas.suggestion,datas.status,id],(err, res) => {
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
"DELETE FROM evaluation  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM evaluation", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;