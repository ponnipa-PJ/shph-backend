const sql = require("./db");

const Data = function (datas) {
    this.file = datas.file;
    this.file_name = datas.file_name;
    this.day = datas.day;
    this.company_id = datas.company_id;
    this.no_route = datas.no_route;
    this.no_car = datas.no_car;
    this.license_no1_2 = datas.license_no1_2;
    this.province_license_no1 = datas.province_license_no1;
    this.license_no2_2 = datas.license_no2_2;
    this.province_license_no2 = datas.province_license_no2;
    this.license_no3_2 = datas.license_no3_2;
    this.province_license_no3 = datas.province_license_no3;
    this.registrar_comment = datas.registrar_comment; this.request_at = datas.request_at; this.request_date = datas.request_date; this.request_receiver = datas.request_receiver; this.write_at = datas.write_at; this.write_date = datas.write_date; this.name = datas.name; this.relate = datas.relate; this.address = datas.address; this.moo = datas.moo; this.soi = datas.soi; this.road = datas.road; this.tambon_id = datas.tambon_id; this.amphur_id = datas.amphur_id; this.province_id = datas.province_id; this.phone = datas.phone; this.type_id = datas.type_id; this.number = datas.number; this.license_no1 = datas.license_no1; this.license_no2 = datas.license_no2; this.license_no3 = datas.license_no3; this.wrongtype = datas.wrongtype; this.offtrack = datas.offtrack; this.outside = datas.outside; this.business = datas.business; this.of = datas.of; this.from_date = datas.from_date; this.from_time = datas.from_time; this.to_date = datas.to_date; this.to_time = datas.to_time; this.origin = datas.origin; this.stop = datas.stop; this.destination = datas.destination; this.stop_through = datas.stop_through; this.station_master_id = datas.station_master_id; this.consideration_station_master_status = datas.consideration_station_master_status; this.registrar_id = datas.registrar_id; this.line_at = datas.line_at; this.officer_id = datas.officer_id; this.status_id = datas.status_id; this.updated_date = datas.updated_date; this.created_by = datas.created_by; this.update_by = datas.update_by; this.officer_comment = datas.officer_comment; this.station_master_comment = datas.station_master_comment; this.office_to_operator = datas.office_to_operator; this.consideration_registrar_status = datas.consideration_registrar_status
};
Data.create = (newData, result) => {
    sql.query("INSERT INTO permission_docs SET ?", newData, (err, res) => {
        console.log(err);
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newData });
    });
}

Data.findlast = (name, result) => {
    let query = "SELECT * FROM permission_docs order by id desc";
    
    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res[0]);
    });
};

Data.getgroup = (name, year,created_by,officer_id,station_master_id,registrar_id,admin_id, result) => {
    var list = [{
        id:1,
        name:'ยื่นเรื่อง',
        color:'#A8D1E7'
    },{
        id:2,
        name:'รอดำเนินการ',
        color:'#FCEE9E'
    },{
        id:3,
        name:'ดำเนินการแล้ว',
        color:'#92CEA8'
    }]
    var one = []
    var two = []
    var three = []
    let query = "SELECT p.*,a.company_name FROM permission_docs p left join agancy a on p.company_id = a.id";

    for (let r = 0; r < 3; r++) {
        query = "SELECT p.*,a.company_name FROM permission_docs p left join agancy a on p.company_id = a.id";
        if (name) {
            query += ` WHERE p.name LIKE '%${name}%'`;
        }
        if (year) {
            query += ` WHERE Year(p.created_date) = ${year}`;
        }
        if (created_by) {
            query += ` WHERE (p.created_by = ${created_by}`;
        }
        if (officer_id) {
            query += ` WHERE (p.officer_id = ${officer_id}`;
        }
        if (station_master_id) {
            query += ` WHERE (p.station_master_id = ${station_master_id}`;
        }
        if (registrar_id) {
            query += ` WHERE (p.registrar_id = ${registrar_id}`;
        }
        if (admin_id) {
            query += ` WHERE (p.status_id is not null`;
        }
        if (r == 0) {
            query += ` and p.status_id >= 1 and p.status_id <3)`;
            if (officer_id) {
                query += ` or (p.officer_id is null and p.status_id is null)`;
            }
            query += ` order by p.id desc`;
        }
        else if (r == 1) {
            query += ` and p.status_id >=  3 and p.status_id <= 5) and p.file is null order by p.id desc`;
        }else if (r == 2) {
            query += ` and p.status_id = 5 and p.file is not null) order by p.id desc`;
        }
        console.log(query);
        sql.query(query, (err, res) => {
            // console.log(r);
            // console.log(res);
            if (r == 0) {
                one = res
            }else if(r == 1){
                two = res
            }else if(r == 2){
                three = res
            }
        });
        
    }
    
    // console.log(query);
    sql.query(query, (err, res) => {
        
        
        if (err) {
            result(null, err);
            return;
        }
        for (let l = 0; l < list.length; l++) {
            if (list[l].id == 1) {
                list[l].data = one
            }else if (list[l].id == 2) {
                list[l].data = two
            }else if (list[l].id == 3) {
                list[l].data = three
            }
            
        }
        
        // console.log(list);
        result(null, list);
    });
};

Data.getAll = (name, year,created_by,officer_id,station_master_id,registrar_id, result) => {
    let query = "SELECT p.*,a.company_name FROM permission_docs p left join agancy a on p.company_id = a.id";
    if (name) {
        query += ` WHERE p.name LIKE '%${name}%'`;
    }
    if (year) {
        query += ` WHERE Year(p.created_date) = ${year}`;
    }
    if (created_by) {
        query += ` WHERE p.created_by = ${created_by}`;
    }
    if (officer_id) {
        query += ` WHERE p.officer_id = ${officer_id} || p.officer_id is null`;
    }
    if (station_master_id) {
        query += ` WHERE p.station_master_id = ${station_master_id}`;
    }
    if (registrar_id) {
        query += ` WHERE p.registrar_id = ${registrar_id}`;
    }
    query += ` order by p.id desc`;
    console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};
Data.findById = (id, result) => {
    sql.query(`SELECT p.*,ag.company_name,p.no_route,p.no_car,p.license_no1_2,p.province_license_no1,p.license_no2_2,p.province_license_no2,p.license_no3_2,p.province_license_no3,p.registrar_comment,uo.email as office_email,uo.line_token as office_line_token,us.email as station_email,us.line_token as station_line_token,ur.email as registrar_email,ur.line_token as registrar_line_token,u.email,p.created_by,p.status_id,p.consideration_registrar_status,p.officer_id,p.office_to_operator,p.officer_comment,p.station_master_id,p.station_master_comment,p.line_at,p.registrar_id,p.consideration_station_master_status,p.id,p.request_at,p.request_date,p.request_receiver,p.write_at,p.write_date,p.name,p.relate,p.address,p.moo,p.soi,p.road,p.phone,p.type_id,p.tambon_id,p.amphur_id,p.province_id,p.number,p.license_no1,p.license_no2,p.license_no3,p.wrongtype,p.offtrack,p.outside,p.business,p.of,p.from_date,p.from_time,p.to_date,p.to_time,p.origin,p.stop,p.destination,p.stop_through,p.station_master_id,p.consideration_station_master_status,p.registrar_id,p.line_at,p.officer_id,p.status_id,p.status_id, d.name_th as tambon_th,a.name_th as amphur_th,pr.name_th as province_th,tl.name as type_name,pr1.name_th as province_license_no1_text,pr2.name_th as province_license_no2_text,pr3.name_th as province_license_no3_text FROM permission_docs p left join provinces pr on p.province_id = pr.id left join districts d on d.id = p.tambon_id left join amphures a on p.amphur_id = a.id left join type_license tl on p.type_id = tl.id left join users u on p.created_by = u.id left join users uo on p.officer_id = uo.id left join users us on p.station_master_id = us.id left join users ur on p.registrar_id = ur.id left join provinces pr1 on p.province_license_no1 = pr1.id left join provinces pr2 on p.province_license_no2 = pr2.id left join provinces pr3 on p.province_license_no3 = pr3.id left join agancy ag on p.company_id = ag.id  WHERE p.id = ${id}`, (err, res) => {
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

Data.senttooperator = (id, datas, result) => {
    sql.query(
        "UPDATE permission_docs SET registrar_comment=?,consideration_registrar_status = ?,status_id=?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.registrar_comment,datas.consideration_registrar_status, datas.status_id, new Date(), datas.update_by, id], (err, res) => {

            console.log(err);
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

Data.sendtoregistrar = (id, datas, result) => {
    sql.query(
        "UPDATE permission_docs SET registrar_id = ?,consideration_station_master_status = ?,station_master_comment = ?,status_id=?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.registrar_id, datas.consideration_station_master_status, datas.station_master_comment, datas.status_id, new Date(), datas.update_by, id], (err, res) => {

            console.log(err);
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

Data.sendtostationmaster = (id, datas, result) => {
    console.log(datas);
    sql.query(
        "UPDATE permission_docs SET officer_comment = ?,station_master_id = ?,status_id=?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.officer_comment, datas.station_master_id, datas.status_id, new Date(), datas.update_by, id], (err, res) => {

            console.log(err);
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
Data.commenttooperator = (id, datas, result) => {
    sql.query(
        "UPDATE permission_docs SET officer_id=?,office_to_operator = ?,status_id=?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.officer_id, datas.office_to_operator, datas.status_id, new Date(), datas.update_by, id], (err, res) => {

            // console.log(err);   
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

Data.updatedoc = (id, datas, result) => {
    sql.query(
        "UPDATE permission_docs SET file = ?,file_name = ?,day = ?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.file,datas.file_name,datas.day, new Date(), datas.update_by, id], (err, res) => {

            // console.log(err);   
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
        "UPDATE permission_docs SET no_route = ?,no_car = ?,license_no1_2 = ?,province_license_no1 = ?,license_no2_2 = ?,province_license_no2 = ?,license_no3_2 = ?,province_license_no3 = ?,request_at = ?,request_date = ?,request_receiver = ?,write_at = ?,write_date = ?,name = ?,relate = ?,address = ?,moo = ?,soi = ?,road = ?,tambon_id = ?,amphur_id = ?,province_id = ?,phone = ?,type_id = ?,number = ?,license_no1 = ?,license_no2 = ?,license_no3 = ?,wrongtype = ?,offtrack = ?,outside = ?,business = ?,of = ?,from_date = ?,from_time = ?,to_date = ?,to_time = ?,origin = ?,stop = ?,destination = ?,stop_through = ?,updated_date = ?,update_by = ? WHERE id = ?",
        [datas.no_route,datas.no_car,datas.license_no1_2,datas.province_license_no1,datas.license_no2_2,datas.province_license_no2,datas.license_no3_2,datas.province_license_no3,datas.request_at, datas.request_date, datas.request_receiver, datas.write_at, datas.write_date, datas.name, datas.relate, datas.address, datas.moo, datas.soi, datas.road, datas.tambon_id, datas.amphur_id, datas.province_id, datas.phone, datas.type_id, datas.number, datas.license_no1, datas.license_no2, datas.license_no3, datas.wrongtype, datas.offtrack, datas.outside, datas.business, datas.of, datas.from_date, datas.from_time, datas.to_date, datas.to_time, datas.origin, datas.stop, datas.destination, datas.stop_through, new Date(), datas.update_by, id], (err, res) => {

            // console.log(err);   
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
        "DELETE FROM permission_docs  WHERE id = ?", id, (err, res) => {
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
    sql.query("DELETE FROM permission_docs", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Data;