const sql = require("./db");

const Data = function (datas) {
this.user_id=datas.user_id,this.file_name=datas.file_name,this.company_name=datas.company_name;this.file=datas.file;this.activate=datas.activate;this.status=datas.status;this.updated_date=datas.updated_date;};
Data.create = (newData, result) => {
sql.query("INSERT INTO agancy SET ?", newData, (err, res) => {
    //console.log(err);
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name,status, result) => {
let query = "SELECT a.id,a.user_id,a.company_name,a.file_name,a.file,a.activate,a.status,u.firstname,u.lastname FROM agancy a join users u on a.user_id = u.id WHERE a.status = 1";
if (name) {
query += ` and a.user_id = ${name}`;
}
if (status) {
    query += ` and a.activate = 1`;
    }
//console.log(query);
sql.query(query, (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};
Data.findById = (id, result) => {
sql.query(`SELECT * FROM agancy WHERE id = ${id}`, (err, res) => {
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


Data.updateAgencyActivate = (id, datas, result) => {
    sql.query(
    "UPDATE agancy SET activate = ? WHERE id = ?",
    [datas.activate,id],(err, res) => {
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

Data.updateById = (id, datas, result) => {
sql.query(
"UPDATE agancy SET company_name = ?,file = ?,file_name = ? WHERE id = ?",
[datas.company_name,datas.file,datas.file_name,id],(err, res) => {
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
"UPDATE agancy SET status = 0 WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM agancy", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;