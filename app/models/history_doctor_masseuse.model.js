const sql = require("./db");

const Data = function (datas) {
this.eventId=datas.eventId;};
Data.create = (newData, result) => {
sql.query("INSERT INTO history_doctor_masseuse SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getAll = (name,doctorId, result) => {
let query = "SELECT m.id,m.date,m.time,d.firstname,d.lastname FROM history_doctor_masseuse h join map_events m on m.id = h.eventId join users d on m.doctorId = d.id join users u on m.userId = u.id where h.status = 1";
if (name) {
query += ` and m.userId = ${name}`;
}
if (doctorId) {
    query += ` and m.doctorId = ${doctorId}`;
    }
query += ` order by m .date desc`
console.log(query);
sql.query(query, (err, res) => {
    for (let r = 0; r < res.length; r++) {
        let allfinish = `SELECT m.type,h.*,u.firstname,u.lastname,u.UID FROM history_doctor_masseuse h join map_events m on m.id = h.eventId join users u on u.id = m.userId where h.eventId = ${res[r].id}`;
        // console.log(allfinish);
            res[r].idtab = 'heading'+(r+1)
            res[r].target = '#collapse'+(r+1)
            res[r].controls = 'collapse'+(r+1)
            // res[r].idtab = 'headingOne'
            // res[r].target = '#collapseOne'
            // res[r].controls = 'collapseOne'
        sql.query(allfinish, (err, allfinishs) => {
            res[r].case = allfinishs[0]
        });
    }
if (err) {
result(null, err);
return;
}
setTimeout(() => {

    result(null, res);
}, 500);
});
};

Data.getreportdoctor = (userId,doctorId, result) => {
    // and m.date >= CURDATE()
    let query = "SELECT m.date from map_events m where m.status = 1 and m.date >= CURDATE()";
    if (userId) {
    query += ` and m.userId = ${userId}`;
    }
    if (doctorId) {
        query += ` and m.doctorId = ${doctorId}`;
        }
    query += ` group by m.date;`
    // console.log(query);
    // let query = "SELECT u.UID,m.userId,u.firstname as userfirstname,u.lastname as userlastname FROM history_doctor_masseuse h join map_events m on m.id = h.eventId join users d on m.doctorId = d.id join users u on m.userId = u.id where h.status = 1";
    // if (userId) {
    // query += ` and m.userId = ${userId}`;
    // }
    // if (doctorId) {
    //     query += ` and m.doctorId = ${doctorId}`;
    //     }
    // query += ` group by m.userId;`
    // console.log(query);
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
            var date = new Date(res[r].date);
    date =   date.toLocaleDateString('en-EN', { weekday: 'short' })
    if (date == 'Mon') {
        res[r].color = '#ffff00'
    }else if(date == 'Tue'){
        res[r].color = '#ffc0cb'
    }else if(date == 'Wed'){
        res[r].color = '#008000'
    }else if(date == 'Thu'){
        res[r].color = '#ffa500'
    }else if(date == 'Fri'){
        res[r].color = '#00bfff'
    }else if(date == 'Sat'){
        res[r].color = '#800080'
    }else if(date == 'Sun'){
        res[r].color = '#ff0000'
    }
            let allfinish = `SELECT m.*,u.firstname,u.lastname,u.UID FROM map_events m join users u on u.id = m.userId where m.date =  '${res[r].date}' and m.status = 1`;
            if (userId) {
                allfinish += ` and m.userId = ${userId}`;
                }
                if (doctorId) {
                    allfinish += ` and m.doctorId = ${doctorId}`;
                    }
                    allfinish += ` order by m.time`; 
                // console.log(allfinish);
        //         res[r].idtab = 'headingden'+(r+1)
        //         res[r].target = '#collapseden'+(r+1)
        //         res[r].controls = 'collapseden'+(r+1)
        //         // res[r].idtab = 'headingOne'
        //         // res[r].target = '#collapseOne'
        //         // res[r].controls = 'collapseOne'
            sql.query(allfinish, (err, allfinishs) => {
                res[r].case = allfinishs
            });
        }
    if (err) {
    result(null, err);
    return;
    }
    setTimeout(() => {
    
        result(null, res);
    }, 500);
    });
    };

Data.findById = (id, result) => {
sql.query(`SELECT * FROM history_doctor_masseuse WHERE eventId = ${id}`, (err, res) => {
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
"UPDATE history_doctor_masseuse SET eventId = ? WHERE id = ?",
[datas.eventId,id],(err, res) => {
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
"DELETE FROM history_doctor_masseuse  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM history_doctor_masseuse", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;