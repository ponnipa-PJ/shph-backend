const sql = require("./db");

const Data = function (datas) {
this.date=datas.date;this.shphId=datas.shphId;this.eventId=datas.eventId;this.userId=datas.userId;this.createdBy=datas.createdBy;this.doctorId=datas.doctorId;};
Data.create = (newData, result) => {
    console.log(newData.eventId);
    var data = {
        date:newData.date,
                    shphId:newData.shphId,
                    eventId:JSON.stringify(newData.eventId),
                    doctorId:newData.doctorId,
                    userId:newData.userId,
                    createdBy:newData.createdBy,
    }
    console.log(data);
sql.query("INSERT INTO map_events SET ?", data, (err, res) => {
if (err) {
    console.log(err);
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name, result) => {
let query = "SELECT * FROM map_events";
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
sql.query(`SELECT * FROM map_events WHERE id = ${id}`, (err, res) => {
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
"UPDATE map_events SET date = ?,shphId = ?,eventId = ?,userId = ?,createdBy = ? WHERE id = ?",
[datas.date,datas.shphId,datas.eventId,datas.userId,datas.createdBy,id],(err, res) => {
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
"DELETE FROM map_events  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM map_events", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;