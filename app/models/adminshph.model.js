const sql = require("./db");
var bcrypt = require("bcryptjs");

const Data = function (datas) {
this.adminId=datas.adminId;this.shphId=datas.shphId;this.username=datas.username;this.password=datas.password;this.status=datas.status;this.hash = datas.hash;this.type = datas.type;};
Data.create = (newData, result) => {
var data = {
    adminId:newData.adminId,
    shphId:newData.shphId,
    username:newData.username,
    type:newData.type,
    password:bcrypt.hashSync(newData.password, 8),
}
sql.query("INSERT INTO adminshph SET ?", data, (err, res) => {
if (err) {
    //console.log(err);
result(err, null);
return;
}
result(null, { id: res.insertId, ...data });
});
}

Data.signin = (req, result) => {
    //console.log(req);
      sql.query(`SELECT * FROM adminshph WHERE username = '${req.UID}'`, (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          // console.log("found user: ", res[0].password);
  //   console.log(req.password);
          // console.log(passwordIsValid);
          var passwordIsValid = bcrypt.compareSync(
              req.password,
              res[0].password
            );
            //console.log(passwordIsValid);
          if (passwordIsValid) {
            // console.log(data);
            result(null, res[0]);
            return;
          }else{
            result(null,{ status: false });
          }
      
        }else{
    
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        }
      });
    };

Data.getAll = (name,adminId,role, result) => {
let query = "SELECT a.*,r.name as role,s.name as shph FROM adminshph a join roles r on a.type = r.id join shph s on a.shphId = s.id";
if (adminId) {
    query += ` WHERE a.adminId = ${adminId}`;
}
if (name) {
query += ` and a.status = ${name}`;
}
if (role !=0) {
  query += ` and a.type = ${role}`;
  }
query += ` order by a.id`;
sql.query(query, (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};
Data.findById = (id, result) => {
sql.query(`SELECT * FROM adminshph WHERE id = ${id}`, (err, res) => {
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
    if(datas.password != datas.hash){
        datas.password = bcrypt.hashSync(datas.password, 8)
      }
sql.query(
"UPDATE adminshph SET password = ?,type =? ,shphId=? WHERE id = ?",
[datas.password,datas.type,datas.shphId,id],(err, res) => {
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
Data.remove = (id,status, result) => {
  // console.log(status,id);
  // console.log(`UPDATE adminshph set status = ${status} WHERE id = ${id}`);
sql.query(
`UPDATE adminshph set status = ${status} WHERE id = ?`,id, (err, res) => {
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
sql.query("DELETE FROM adminshph", (err, res) => {
if (err) {
result(null, err);
return;
}
result(null, res);
});
};

module.exports = Data;