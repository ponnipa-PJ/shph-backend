const sql = require("./db");

const Data = function (datas) {
    this.message_chiropractor=datas.message_chiropractor;this.cancel_chiropractor=datas.cancel_chiropractor;this.message_dentist=datas.message_dentist;this.cancel_dentist=datas.cancel_dentist;this.day=datas.day;this.time=datas.time;this.hour=datas.hour;this.no_dentist=datas.no_dentist;};
Data.create = (newData, result) => {
sql.query("INSERT INTO notification SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM notification";
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
sql.query(`SELECT * FROM notification WHERE id = ${id}`, (err, res) => {
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
"UPDATE notification SET day = ?,time = ?,hour = ?,no_dentist=?,message_chiropractor=?,cancel_chiropractor=?,message_dentist=?,cancel_dentist=? WHERE id = ?",
[datas.day,datas.time,datas.hour,datas.no_dentist,datas.message_chiropractor,datas.cancel_chiropractor,datas.message_dentist,datas.cancel_dentist,id],(err, res) => {
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
"DELETE FROM notification  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM notification", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;