const sql = require("./db");

const Data = function (datas) {
this.confirmstatus=datas.confirmstatus;this.date=datas.date;this.shphId=datas.shphId;this.eventId=datas.eventId;this.userId=datas.userId;this.createdBy=datas.createdBy;this.doctorId=datas.doctorId;this.typebook=datas.typebook;this.time=datas.time;this.type=datas.type};
Data.create = (newData, result) => {
    console.log(newData.eventId);
    var data = {
        date:newData.date,
                    shphId:newData.shphId,
                    eventId:JSON.stringify(newData.eventId),
                    doctorId:newData.doctorId,
                    userId:newData.userId,
                    createdBy:newData.createdBy,
                    typebook:newData.typebook,
                    time:newData.time,
                    type:JSON.stringify(newData.type),
    }
    // console.log(data);
sql.query("INSERT INTO map_events SET ?", data, (err, res) => {
if (err) {
    console.log(err);
result(err, null);
return;
}
result(null, { id: res.insertId, ...newData });
});
}

Data.geteventbycreatedBy = (date, doctorId,userid,shphId, result) => {
    let query = `SELECT m.*,u.firstname,u.lastname,t.name  as type,m.time FROM map_events m join users u on m.userId = u.id join typesbook t on m.typebook = t.id where m.date = '${date}' and m.doctorId = ${doctorId} and m.createdBy = ${userid} and m.shphId = ${shphId} and m.status =1`;

    // console.log(query);
    sql.query(query, (err, res) => {
    //    for (let l = 0; l < res.length; l++) {
    //     var eventId = JSON.parse(res[l].eventId)
    //     // console.log(eventId);
    //     var eventlist = []
    //     for (let e = 0; e < eventId.length; e++) {
    //         console.log(eventId[e]);
    //     let events = `SELECT * FROM events where id = ${eventId[e]}`;
    //     sql.query(events, (err, event) => {
    //         console.log(e+1 ,eventId.length);
    //         eventlist.push(event)
            
    //         if (e+1 == eventId.length) {
    //             res[l].event = eventlist
                
    //         }
    //     })
    //     }
        
    //    }
        if (err) {
            result(null, err);
            return;
        }
        setTimeout(() => {

            result(null, res);
        }, 500);
    });
};

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

Data.findbyuserId = (id, result) => {
    sql.query(`SELECT m.type,m.date,u.UID,m.userId,m.id as eventId,m.eventId as eventIdlist,m.typebook,h.*,u.firstname,u.lastname,m.time FROM map_events m join users u on m.userId = u.id join history_user_masseuse h on h.eventId = m.id WHERE m.userId = ${id} order by m.date,m.time desc`, (err, res) => {
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
sql.query(`SELECT m.type,m.date,u.UID,m.userId,m.id as eventId,m.eventId as eventIdlist,m.typebook,h.*,u.firstname,u.lastname,m.time FROM map_events m join users u on m.userId = u.id join history_user_masseuse h on h.eventId = m.id WHERE m.id = ${id}`, (err, res) => {
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

Data.updateconfirm = (id, datas, result) => {
    sql.query(
    "UPDATE map_events SET confirmstatus = ? WHERE id = ?",
    [datas.confirmstatus,id],(err, res) => {
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