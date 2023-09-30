const sql = require("./db");

const Data = function (datas) {
    this.noti = datas.noti; this.userId = datas.userId; this.borderColor = datas.borderColor; this.backgroundColor = datas.backgroundColor; this.title = datas.title; this.date = datas.date; this.doctorId = datas.doctorId; this.bookstatus = datas.bookstatus; this.status = datas.status;
};
Data.create = (newData, result) => {
    console.log(newData);
    sql.query("INSERT INTO events SET ?", newData, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newData });
    });
}

Data.book = (name, id,shphId, result) => {
    let query = `SELECT d.*,e.date FROM events e join users d on e.doctorId = d.id WHERE e.status !=0  and e.bookstatus !=2 and e.date >= CURDATE() and d.shphId = ${shphId}`;
    if (name) {
        query += ` and e.date LIKE '%${name}%'`;
    }
    query += ' Group by e.doctorId order by e.date'
    console.log(query);
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
            res[r].title = res[r].firstname + ' '+ res[r].lastname
        //     if (res[r].title != 'พักเทียง') {
        //     let query = `SELECT * FROM events WHERE userId = ${id} and date = '${res[r].date}'`;
        //     // console.log(query);
            
                
            
        //     sql.query(query, (err, doc) => {
        //         if (doc.length > 0) {
        //             res[r] = doc[0]
        //         }else{
        //             res[r].bookstatus = 1
        //             res[r].userId = null
        //             res[r].remark = null
        //             res[r].title = 'ว่าง'
        //         }
        //     })
    //     }
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


Data.getquebyuserid = (date, id,doctorid, result) => {
    var list = []
    let query = `SELECT e.*,u.firstname,u.lastname FROM events e LEFT JOIN users u on e.doctorId = u.id WHERE e.status !=0 and e.userId =${id} and e.doctorId =${doctorid} and e.bookstatus != 2 and e.title != 'พักเที่ยง' and e.title != 'พักเทียง'`;
    if (date) {
        var date = date.replace(' ', '+')
        query += ` and e.date LIKE '%${date}%'`;
    }
    console.log(query, 'df');
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
            list.push(res[r].id)
        //     console.log(res[r].date);
        //     var d = new Date(res[r].date)
        //     console.log(d);
        //     day = (d.getDate()).toString().padStart(2, "0");
        //     month = (d.getMonth() + 1).toString().padStart(2, "0");
        // year =   d.getFullYear()
        // hour = (d.getHours()).toString().padStart(2, "0");
        // minute = (d.getMinutes()).toString().padStart(2, "0");
        // second = (d.getSeconds()).toString().padStart(2, "0");
        // console.log(d.getTime());     
        // console.log(day);   
        // console.log(month);   
        // console.log(year);  
        // console.log(hour);
        // console.log(minute);
        // console.log(second);
        // if (hour == 00 && minute ==00 && second ==00) {
        //     date = year+'-'+month+'-'+day
        // }else{
        //     // date = "2023-09-25T06:00:00+07:00"
        //     date = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+'+07:00'
        // }
        // res[r].date =  date
        }
        if (err) {
            result(null, err);
            return;
        }
        result(null, list);
    });
};

Data.gettimebydoctoranddate = (date, id,userid, result) => {
    let query = `SELECT e.*,u.firstname,u.lastname FROM events e join users u on u.id = e.doctorId WHERE e.status !=0 and(e.userId is null or e.userId =${userid} ) and e.doctorId =${id} and e.bookstatus != 2 and e.title != 'พักเที่ยง' and e.title != 'พักเทียง' and e.date >= CURDATE()`;
    if (date) {
        // var date = date.replace(' ', '+')
        query += ` and e.date LIKE '%${date}%' order by e.date`;
    }
    console.log(query);
    sql.query(query, (err, res) => {
        // for (let r = 0; r < res.length; r++) {
        //     console.log(res[r].date);
        //     var d = new Date(res[r].date)
        //     console.log(d);
        //     day = (d.getDate()).toString().padStart(2, "0");
        //     month = (d.getMonth() + 1).toString().padStart(2, "0");
        // year =   d.getFullYear()
        // hour = (d.getHours()).toString().padStart(2, "0");
        // minute = (d.getMinutes()).toString().padStart(2, "0");
        // second = (d.getSeconds()).toString().padStart(2, "0");
        // console.log(d.getTime());     
        // console.log(day);   
        // console.log(month);   
        // console.log(year);  
        // console.log(hour);
        // console.log(minute);
        // console.log(second);
        // if (hour == 00 && minute ==00 && second ==00) {
        //     date = year+'-'+month+'-'+day
        // }else{
        //     // date = "2023-09-25T06:00:00+07:00"
        //     date = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+'+07:00'
        // }
        // res[r].date =  date
        // }
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Data.getdoctorbydate = (date, id, result) => {
    let query = `SELECT d.* FROM events e  LEFT JOIN users d on e.doctorId = d.id WHERE e.status !=0 and(e.userId is null or e.userId =${id} )`;
    if (date) {
        var date = date.replace(' ', '+')
        query += ` and e.date = '${date}'`;
    }
    console.log(query);
    sql.query(query, (err, res) => {
        // for (let r = 0; r < res.length; r++) {
        //     console.log(res[r].date);
        //     var d = new Date(res[r].date)
        //     console.log(d);
        //     day = (d.getDate()).toString().padStart(2, "0");
        //     month = (d.getMonth() + 1).toString().padStart(2, "0");
        // year =   d.getFullYear()
        // hour = (d.getHours()).toString().padStart(2, "0");
        // minute = (d.getMinutes()).toString().padStart(2, "0");
        // second = (d.getSeconds()).toString().padStart(2, "0");
        // console.log(d.getTime());     
        // console.log(day);   
        // console.log(month);   
        // console.log(year);  
        // console.log(hour);
        // console.log(minute);
        // console.log(second);
        // if (hour == 00 && minute ==00 && second ==00) {
        //     date = year+'-'+month+'-'+day
        // }else{
        //     // date = "2023-09-25T06:00:00+07:00"
        //     date = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+'+07:00'
        // }
        // res[r].date =  date
        // }
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Data.geteventbydocanddate = (date, id, result) => {
    let query = `SELECT e.*,u.firstname,u.lastname FROM events e LEFT join users u on e.doctorId = u.id WHERE e.doctorId = ${id}`;
    if (date) {
        var date = date.replace(' ', '+')
        query += ` and e.date = '${date}'`;
    }
    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res[0]);
    });
};

Data.geteventbyuseranddate = (date, id, result) => {
    let query = `SELECT * FROM events WHERE status !=0 and userId =${id}`;
    if (date) {
        query += ` and date LIKE '%${date}%' and date != '${date}'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Data.geteventbydate = (date,datecurrent, result) => {
    let query = `SELECT e.*,d.firstname,d.lastname,u.line_token FROM events e left join users u on u.id = e.userId join users d on d.id = e.doctorId WHERE e.status !=0 and e.userId is not null `;
    if (date) {
        query += ` and date LIKE '%${date}%' or date LIKE '%${datecurrent}%'`;
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

Data.deleteevent = (date, id, result) => {
    let query = `DELETE FROM events WHERE doctorId =${id} and bookstatus != 0`;
    if (date) {
        query += ` and date LIKE '%${date}%'`;
    }

    sql.query(query, (err, res) => {
        // for (let r = 0; r < res.length; r++) {
        //     console.log(res[r].date);
        //     var d = new Date(res[r].date)
        //     console.log(d);
        //     day = (d.getDate()).toString().padStart(2, "0");
        //     month = (d.getMonth() + 1).toString().padStart(2, "0");
        // year =   d.getFullYear()
        // hour = (d.getHours()).toString().padStart(2, "0");
        // minute = (d.getMinutes()).toString().padStart(2, "0");
        // second = (d.getSeconds()).toString().padStart(2, "0");
        // console.log(d.getTime());     
        // console.log(day);   
        // console.log(month);   
        // console.log(year);  
        // console.log(hour);
        // console.log(minute);
        // console.log(second);
        // if (hour == 00 && minute ==00 && second ==00) {
        //     date = year+'-'+month+'-'+day
        // }else{
        //     // date = "2023-09-25T06:00:00+07:00"
        //     date = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+'+07:00'
        // }
        // res[r].date =  date
        // }
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Data.getAll = (name, id, result) => {
    var list =[]
    let query = `SELECT e.*,u.line_token FROM events e left join users u on e.userId = u.id WHERE e.status !=0 and e.doctorId =${id} and e.date >= CURDATE()`;
    if (name) {
        query += ` and e.date LIKE '%${name}%'`;
    }
console.log(query);
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
        //     console.log(res[r].date);
        //     var d = new Date(res[r].date)
        //     console.log(d);
        //     day = (d.getDate()).toString().padStart(2, "0");
        //     month = (d.getMonth() + 1).toString().padStart(2, "0");
        // year =   d.getFullYear()
        // hour = (d.getHours()).toString().padStart(2, "0");
        // minute = (d.getMinutes()).toString().padStart(2, "0");
        // second = (d.getSeconds()).toString().padStart(2, "0");
        // console.log(d.getTime());     
        // console.log(day);   
        // console.log(month);   
        // console.log(year);  
        // console.log(hour);
        // console.log(minute);
        // console.log(second);
        // if (hour == 00 && minute ==00 && second ==00) {
        //     date = year+'-'+month+'-'+day
        // }else{
        //     // date = "2023-09-25T06:00:00+07:00"
        //     date = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second+'+07:00'
        // }
        // if (res[r].userId == null) {
        //     list.push(res[r])
        // }else{
        //     let query = `SELECT e.*,u.line_token FROM events e left join users u on e.userId = u.id WHERE e.status !=0 and e.doctorId =${id} and e.date >= CURDATE()`;

        // }
        }
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Data.findById = (id, result) => {
    sql.query(`SELECT e.*,d.firstname,d.lastname,u.firstname as userfirst,u.lastname as userlast,u.line_token FROM events e left join users d on e.doctorId = d.id left join users u on e.userId = u.id WHERE e.id = ${id}`, (err, res) => {
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


Data.updateuser = (id, datas, result) => {
    sql.query(
        "UPDATE events SET title = ?,userId=?,bookstatus=? WHERE id = ?",
        [datas.title, datas.userId, datas.bookstatus, id], (err, res) => {
            if (err) {
                console.log(err);
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
        "UPDATE events SET title = ?,userId=?,noti=? WHERE id = ?",
        [datas.title, datas.userId, datas.noti, id], (err, res) => {
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
        "UPDATE events set status = 0 WHERE id = ?", id, (err, res) => {
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

module.exports = Data;