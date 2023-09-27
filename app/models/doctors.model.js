const sql = require("./db");

const Data = function (datas) {
   this.days=datas.days; this.typeId = datas.typeId; this.firstname = datas.firstname; this.lastname = datas.lastname; this.dentistCourseId = datas.dentistCourseId; this.status = datas.status; this.createdBy = datas.createdBy;
};
Data.create = (newData, result) => {
    
    // console.log(newData);
    var data = {

        typeId: newData.typeId,
        firstname: newData.firstname,
        lastname: newData.lastname,
        dentistCourseId: JSON.stringify(newData.dentistCourseId),
        days:JSON.stringify(newData.days),
        status: newData.status,
        createdBy: newData.createdBy
    };
    // console.log(data);
    sql.query("INSERT INTO doctors SET ?", data, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newData });
    });
}

Data.getAll = (name, result) => {
    let query = "SELECT * FROM doctors";
    if (name) {
        query += ` WHERE days LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Data.gettimebydoctor = (id, result) => {
    var list =[]
    sql.query(`SELECT * FROM doctors WHERE id = ${id}`, (err, res) => {
            var time = JSON.parse(res[0].dentistCourseId)
            for (let t = 0; t < time.length; t++) {
                let query = `SELECT * FROM courses WHERE id = ${time[t]}`;
                sql.query(query, (err, res) => {
                    list.push(res[0])
                })
                
            }
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            setTimeout(() => {

                result(null, list);
            }, 500);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Data.findById = (id, result) => {
    sql.query(`SELECT * FROM doctors WHERE id = ${id}`, (err, res) => {
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
        "UPDATE doctors SET firstname = ?,lastname = ?,days=?,dentistCourseId = ? WHERE id = ?",
        [datas.firstname, datas.lastname, JSON.stringify(datas.days),JSON.stringify(datas.dentistCourseId), id], (err, res) => {
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
Data.remove = (id, result) => {
    sql.query(
        "DELETE FROM doctors  WHERE id = ?", id, (err, res) => {
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
    sql.query("DELETE FROM doctors", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Data;