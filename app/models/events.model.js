const e = require("express");
const sql = require("./db");

const Data = function (datas) {
    this.shphId = datas.shphId; this.createdBy = datas.createdBy; this.confirmstatus = datas.confirmstatus; this.noti = datas.noti; this.userId = datas.userId; this.borderColor = datas.borderColor; this.backgroundColor = datas.backgroundColor; this.title = datas.title; this.date = datas.date; this.doctorId = datas.doctorId; this.bookstatus = datas.bookstatus; this.status = datas.status;
};
Data.create = (newData, result) => {
    // console.log(newData);
    sql.query("INSERT INTO events SET ?", newData, (err, res) => {
        if (err) {
            //console.log(err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newData });
    });
}
Data.createcolumn = (name, result) => {
    //console.log(name);
    let query = `ALTER TABLE history_user_masseuse ADD ID${name} varchar(255) NULL`;
    //console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};


Data.book = (name, id, shphId, result) => {
    var list = []
    let query = `SELECT e.id,d.id as docid, d.firstname,d.lastname,e.date FROM events e join users d on e.doctorId = d.id WHERE e.status !=0  and e.bookstatus =2 and e.date >= CURDATE() and e.shphId = ${shphId}`;
    if (name) {
        query += ` and e.date LIKE '%${name}%'`;
    }

    // query += ' Group by e.doctorId order by e.date'
    //console.log(query);
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
            if (id) {
                let check = `SELECT e.* FROM events e WHERE e.date LIKE '%${res[r].date}%' and e.doctorId = ${res[r].docid} and e.shphId = ${shphId} and e.bookstatus = 0`;
                sql.query(check, (err, checks) => {
        // console.log(checks.length);
        if (checks.length < id) {
            list.push({
                id:res[r].id,
                docid:res[r].docid,
                date:res[r].date,
                title:res[r].firstname + ' ' + res[r].lastname
            })
            // res[r].title = res[r].firstname + ' ' + res[r].lastname
        }
                });
            }
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

            result(null, list);
        }, 500);
    });
};


Data.getquebyuserid = (date, id, doctorid, shphId, result) => {
    var list = []
    let query = `SELECT e.id as event_id,e.eventId as eventIdlist,h.* FROM map_events e LEFT JOIN users u on e.userId = u.id join history_user_masseuse h on e.id = h.eventId WHERE e.status =1 and e.userId =${id} and e.doctorId =${doctorid} and e.date = '${date}'`;
    // let query = `SELECT e.*,u.firstname,u.lastname FROM events e LEFT JOIN users u on e.doctorId = u.id WHERE e.status !=0 and e.userId =${id} and e.doctorId =${doctorid} and e.bookstatus != 2 and e.title != 'พักเที่ยง' and e.title != 'พักเทียง'`;
    // if (date) {
    //     var date = date.replace(' ', '+')
    //     query += ` and e.date LIKE '%${date}%'`;
    // }
    // console.log(query, 'df');
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
        result(null, res);
    });
};

Data.gettimebydoctoranddate = (date, id, userid, shphId, type, result) => {
    let query = `SELECT e.*,u.firstname,u.lastname FROM events e join users u on u.id = e.doctorId `;
    if (type == 1) {
        query += ` WHERE e.status !=0 and(e.userId is null) and e.doctorId =${id} and e.shphId = ${shphId} and e.bookstatus != 2 and e.title != 'พักเที่ยง' and e.title != 'พักเทียง' and e.date >= CURDATE() and e.bookstatus != 0`
    } else if (type == 2) {
        query += ` WHERE e.status !=0 and(e.userId is null or e.userId =${userid} ) and e.doctorId =${id} and e.shphId = ${shphId} and e.bookstatus != 2 and e.title != 'พักเที่ยง' and e.title != 'พักเทียง' and e.date >= CURDATE()`
    }
    if (date) {
        // var date = date.replace(' ', '+')
        query += ` and e.date LIKE '%${date}%' order by e.date`;
    }
    //console.log(query);
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
    //console.log(query);
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
    //console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res[0]);
    });
};
function timeformat(time) {
    time = time.split(':')
    return time[0] + '.' + time[1] + ' น.'
}

Data.createsql = (name, result) => {
    let query = name
    //console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Data.geteventbyuseranddate = (date, id, shphId, result) => {
    let query = `SELECT * FROM events WHERE status !=0 and userId =${id}`;
    if (date) {
        query += ` and date LIKE '%${date}%' and date != '${date}' and shphId = ${shphId}`;
    }
    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Data.geteventbydate = (date, datecurrent, result) => {
    var list = []
    let query = `SELECT e.*,d.firstname,d.lastname,u.line_token FROM events e left join users u on u.id = e.userId join users d on d.id = e.doctorId WHERE e.status !=0 and e.userId is not null `;
    if (date) {
        query += ` and (date LIKE '%${date}%' or date LIKE '%${datecurrent}%') group by e.userId`;
    }
    // console.log(query);
    sql.query(query, (err, res) => {
        for (let r = 0; r < res.length; r++) {
            var breaktime = new Date(res[r].date)
            var daytoday = (breaktime.getDate()).toString().padStart(2, "0");
            var monthtoday = (breaktime.getMonth() + 1).toString().padStart(2, "0");
            var yeartoday = breaktime.getFullYear()
            var datetoday = yeartoday + '-' + monthtoday + '-' + daytoday

            let peruser = `SELECT e.*,d.firstname,d.lastname,u.line_token FROM events e left join users u on u.id = e.userId join users d on d.id = e.doctorId WHERE e.userId = ${res[r].userId} and (e.date LIKE '%${datetoday}%') order by e.date asc`;
            sql.query(peruser, (err, user) => {
                var t = ''
                for (let u = 0; u < user.length; u++) {
                    var breaktime = new Date(user[u].date)
                    if (u == 0) {
                        t += timeformat(breaktime.toLocaleTimeString('th-TH'))
                    }
                    if (user.length > 1 && user.length == u + 1) {
                        t += ' - '
                    }
                    if (u + 1 == user.length) {
                        t += timeformat(breaktime.toLocaleTimeString('th-TH'))
                    }
                    // console.log(u,user.length);


                }
                res[r].time = t
                // console.log(t);
                list.push(res[r])
            });
        }
        if (err) {
            result(null, err);
            return;
        }
        setTimeout(() => {

            result(null, list);
        }, 500);
    });
};

Data.deleteevent = (date, id, shphId, result) => {
    let query = `UPDATE events set status = 0 WHERE doctorId =${id} and bookstatus != 0 and shphId = ${shphId}`;
    if (date) {
        query += ` and date LIKE '%${date}%'`;
    }
    //console.log(query);
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

Data.geteventappoint = (name, id, shphId,userId, result) => {
    // console.log(name);
    var list = []
    var eventId= ''
    let query = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.doctorId =${id} and e.date >= CURDATE()`;
    if (name) {
        var event = JSON.parse("[" + name + "]");
        for (let e = 0; e < event.length; e++) {
            eventId += ' e.id = ' + event[e] + ' or '
        }
        eventId = eventId.slice(0, -3);
    }
    // console.log(eventId);
    if (shphId) {
        query += ` and e.shphId = ${shphId} and e.status !=0 and e.bookstatus = 2 `
    }
    if (userId != 0) {
        query += ` and (${eventId} or e.userId is null) and e.bookstatus = 2`
    }else if (userId == 0) {
        query += ` and e.bookstatus != 2 and e.userId is null`
    }

    if (shphId) {
        query = query.replace('and e.bookstatus != 2','')
    }
    // console.log(userId);
    // console.log(query);
    sql.query(query, (err, res) => {
        // console.log(res);
        for (let r = 0; r < res.length; r++) {
            let event = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.doctorId =${id} and e.date >= CURDATE() and e.date LIKE '%${res[r].date}%'`;
            //    console.log(event);
            if (shphId) {
                event += ` and e.shphId = ${shphId} and e.status !=0 `
            }
            if (userId != 0) {
                event += ` and (${eventId} or e.userId is null) and e.bookstatus != 2`
            }else if (userId == 0) {
                event += ` and e.bookstatus != 2 and e.userId is null`
            }
            // console.log(event);
            if (shphId) {
                event = event.replace('and e.bookstatus != 2','')
            }
            // console.log(event);
            sql.query(event, (err, events) => {
                for (let e = 0; e < events.length; e++) {

                    list.push(events[e])

                }
            })
            let eventbookall = `SELECT m.* FROM map_events m WHERE m.date = '${res[r].date}' and m.status = 1`;
            //    console.log(event);
            // sql.query(eventbookall, (err, eventbookalls) => {
            //     var arrevent =[]
            //     var data = {} 
            //     for (let b = 0; b < eventbookalls.length; b++) {
            //          arrevent = JSON.parse(eventbookalls[b].eventId)
            //         // console.log(arrevent);
            //         // console.log(arrevent.length);
            //         for (let arr = 0; arr < arrevent.length; arr++) {
            //             // console.log(arrevent[arr]);
            //             let eventnotnull = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.id = ${arrevent[arr]}`;
            //             // console.log(eventnotnull);
            //             sql.query(eventnotnull, (err, eventsnotnull) => {
            //                 // console.log(arr);
            //                 var l = JSON.parse(eventbookalls[b].eventId)
            //                 if (arr==0) {
            //                     data = eventsnotnull[0]
            //                     data.groupId = eventbookalls[b].id
            //                 }
            //                 if (arr+1 == l.length) {
            //                     // console.log(eventsnotnull[0].date);
            //                     // console.log(l.length);
            //                     data.end = eventsnotnull[0].date
            //                     data.groupId = eventbookalls[b].id
            //                     list.push(data)
            //                 }
            //             })
            //             // console.log(arr);
                        
            //             // if (arr == 0) {
            //             //     date = eventsnotnull[0]
            //             // }
            //             // // console.log(date);
            //             // if (arr + 1 == eventbookalls.length) {
            //             //     date.end = eventsnotnull[o]
            //             //     // console.log(date);

            //             // }
            //             // if (b + 1 == eventbookalls.length) {

            //             //     list.push(date)
            //             // }
                            
            //             // if (arr+1 == arrevent.length) {
            //             //     console.log(data);
            //             //     console.log(1);
            //             //     list.push(data)
            //             // }
            //         }

            //     }

            // });
        }
        if (err) {
            result(null, err);
            return;
        }
        setTimeout(() => {
            // console.log(list);
            result(null, list);
        }, 500);
    });
};

Data.getAll = (name, id, shphId,userId, result) => {
    var list = []
    let query = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.doctorId =${id} and e.date >= CURDATE()`;
    if (name) {
        query += ` and e.date LIKE '%${name}%'`;
    }
    if (shphId) {
        query += ` and e.shphId = ${shphId} and e.status !=0 and e.bookstatus = 2 `
    }
    if (userId != 0) {
        query += ` and e.bookstatus != 2 and (e.userId = ${userId} or e.userId is null)`
    }else if (userId == 0) {
        query += ` and e.bookstatus != 2 and e.userId is null`
    }

    if (shphId) {
        query = query.replace('and e.bookstatus != 2','')
    }
    // console.log(userId);
    // console.log(query);
    sql.query(query, (err, res) => {
        // console.log(res);
        for (let r = 0; r < res.length; r++) {
            let event = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.doctorId =${id} and e.date >= CURDATE() and e.date LIKE '%${res[r].date}%'`;
            //    console.log(event);
            if (shphId) {
                event += ` and e.shphId = ${shphId} and e.status !=0 `
            }
            if (userId != 0) {
                event += ` and e.bookstatus != 2 and (e.userId = ${userId} or e.userId is null)`
            }else if (userId == 0) {
                event += ` and e.bookstatus != 2 and e.userId is null`
            }
            // console.log(event);
            if (shphId) {
                event = event.replace('and e.bookstatus != 2','')
            }
            // console.log(event);
            sql.query(event, (err, events) => {
                for (let e = 0; e < events.length; e++) {

                    list.push(events[e])

                }
            })
            let eventbookall = `SELECT m.* FROM map_events m WHERE m.date = '${res[r].date}' and m.status = 1`;
            //    console.log(event);
            sql.query(eventbookall, (err, eventbookalls) => {
                var arrevent =[]
                var data = {} 
                for (let b = 0; b < eventbookalls.length; b++) {
                     arrevent = JSON.parse(eventbookalls[b].eventId)
                    // console.log(arrevent);
                    // console.log(arrevent.length);
                    for (let arr = 0; arr < arrevent.length; arr++) {
                        // console.log(arrevent[arr]);
                        let eventnotnull = `SELECT e.* FROM events e left join users u on e.userId = u.id WHERE e.id = ${arrevent[arr]}`;
                        // console.log(eventnotnull);
                        sql.query(eventnotnull, (err, eventsnotnull) => {
                            // console.log(arr);
                            var l = JSON.parse(eventbookalls[b].eventId)
                            if (arr==0) {
                                data = eventsnotnull[0]
                                data.groupId = eventbookalls[b].id
                            }
                            if (arr+1 == l.length) {
                                // console.log(eventsnotnull[0].date);
                                // console.log(l.length);
                                data.end = eventsnotnull[0].date
                                data.groupId = eventbookalls[b].id
                                list.push(data)
                            }
                        })
                        // console.log(arr);
                        
                        // if (arr == 0) {
                        //     date = eventsnotnull[0]
                        // }
                        // // console.log(date);
                        // if (arr + 1 == eventbookalls.length) {
                        //     date.end = eventsnotnull[o]
                        //     // console.log(date);

                        // }
                        // if (b + 1 == eventbookalls.length) {

                        //     list.push(date)
                        // }
                            
                        // if (arr+1 == arrevent.length) {
                        //     console.log(data);
                        //     console.log(1);
                        //     list.push(data)
                        // }
                    }

                }

            });
        }
        if (err) {
            result(null, err);
            return;
        }
        setTimeout(() => {
            // console.log(list);
            result(null, list);
        }, 500);
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


Data.updateconfirm = (id, datas, result) => {
    sql.query(
        "UPDATE events SET confirmstatus = ? WHERE id = ?",
        [datas.confirmstatus, id], (err, res) => {
            if (err) {
                //console.log(err);
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

Data.updateuser = (id, datas, result) => {
    sql.query(
        "UPDATE events SET title = ?,userId=?,bookstatus=? WHERE id = ?",
        [datas.title, datas.userId, datas.bookstatus, id], (err, res) => {
            if (err) {
                //console.log(err);
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