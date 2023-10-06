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

Data.updateno = (id, datas, result) => {
    sql.query(
        "UPDATE map_history_doctor_masseuse SET no = ? WHERE id = ?",
        [datas.no, id], (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }; result(null, { id: id, ...datas });
        }
    );
};

Data.updatestatus = (id, datas, result) => {
    // console.log(datas);
    sql.query(
        "UPDATE map_history_doctor_masseuse SET status = ? WHERE id = ?",
        [datas.status, id], (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }; result(null, { id: id, ...datas });
        }
    );
};

Data.updateById = (id, datas, result) => {
sql.query(
"UPDATE map_history_doctor_masseuse SET historyuserdentistId = ?,name = ? WHERE id = ?",
[datas.historyuserdentistId,datas.name,id],(err, res) => {
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