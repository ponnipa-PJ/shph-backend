const sql = require("./db");

const Data = function (datas) {
    this.name = datas.name; this.url = datas.url; this.no = datas.no;
};
Data.create = (newData, result) => {
    sql.query("INSERT INTO menus SET ?", newData, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newData });
    });
}

Data.getAll = (name, result) => {
    // let query = "SELECT * FROM menus order by no asc";
    // // console.log(query);
    // if (name) {
    // query += ` WHERE name LIKE '%${name}%'`;
    // }
    var list = []
    let header = `SELECT t.icon,t.id,t.name FROM menus m join types_menu t on m.type_menu_id = t.id GROUP by t.id;`
    sql.query(header, (err, headers) => {
        for (let h = 0; h < headers.length; h++) {
            sql.query(`SELECT m.icon,m.name,m.url,m.id FROM menus m WHERE m.type_menu_id = ${headers[h].id} order by m.no`, (err, res) => {
                // console.log(res);
                headers[h].menu = res
                // sql.query(`SELECT m.icon,m.name,m.url FROM role_menu rm join menus m on rm.menu_id = m.id WHERE rm.role_id = '${id}' order by m.no`, (err, res) => {

            });
        }
        if (err) {
            result(null, err);
            return;
        }
        setTimeout(() => {

            result(null, headers);
        }, 500);
    });
};
Data.findById = (id, result) => {
    sql.query(`SELECT * FROM menus WHERE id = ${id}`, (err, res) => {
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


Data.updateorder = (id, datas, result) => {
    sql.query(
        "UPDATE menus SET no = ? WHERE id = ?",
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

Data.updateById = (id, datas, result) => {
    sql.query(
        "UPDATE menus SET name = ? WHERE id = ?",
        [datas.name, id], (err, res) => {
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
        "DELETE FROM menus  WHERE id = ?", id, (err, res) => {
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
    sql.query("DELETE FROM menus", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Data;