const sql = require("./db");

const Data = function (datas) {
    this.mapeventdentistId=datas.mapeventdentistId;this.mapeventId=datas.mapeventId;this.typeappointmentId=datas.typeappointmentId;this.locationId=datas.locationId;this.date=datas.date;this.time=datas.time;};
Data.create = (newData, result) => {
sql.query("INSERT INTO making_appointments SET ?", newData, (err, res) => {
if (err) {
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.getreport = (name, result) => {
    let query = "SELECT * FROM making_appointments";
    
    sql.query(query, (err, res) => {
    if (err) {
    result(null, err);
    return;
    }
    result(null, res);
    });
    };

Data.getAll = (name, result) => {
let query = "SELECT * FROM making_appointments";
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

Data.findOnedentist = (id, result) => {
    sql.query(`SELECT ma.typeappointmentId,ma.locationId,m.* FROM making_appointments ma join map_events_dentist m on ma.mapeventdentistId = m.id WHERE ma.id = ${id}`, (err, res) => {
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

Data.findById = (id, result) => {
sql.query(`SELECT ma.typeappointmentId,ma.locationId,m.* FROM making_appointments ma join map_events m on ma.mapeventId = m.id WHERE ma.id = ${id}`, (err, res) => {
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
"UPDATE making_appointments SET mapeventId = ?,typeappointmentId = ?,locationId = ?,date = ?,time = ? WHERE id = ?",
[datas.mapeventId,datas.typeappointmentId,datas.locationId,datas.date,datas.time,id],(err, res) => {
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

Data.getreportdoctordentist = (userId,doctorId, result) => {
    console.log(doctorId);
    // and m.date >= CURDATE()
    let query = "SELECT m.date from map_events_dentist m where m.status = 1 and m.date >= CURDATE()";
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
            let allfinish = `SELECT ma.id as makeId,m.*,u.firstname,u.lastname,u.UID FROM map_events_dentist m join users u on u.id = m.userId join making_appointments ma on ma.mapeventdentistId = m.id where m.date =  '${res[r].date}' and m.status = 1`;
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

Data.getreportdoctor = (userId,doctorId, result) => {
    console.log(doctorId);
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
            let allfinish = `SELECT ma.id as makeId,m.*,u.firstname,u.lastname,u.UID FROM map_events m join users u on u.id = m.userId join making_appointments ma on ma.mapeventId = m.id where m.date =  '${res[r].date}' and m.status = 1`;
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

Data.remove = (id, result) => {
sql.query(
"DELETE FROM making_appointments  WHERE id = ?",id, (err, res) => {
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
sql.query("DELETE FROM making_appointments", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;