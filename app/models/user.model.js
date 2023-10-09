const sql = require("./db");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// constructor
const Case = function (cases) {
  this.firstname = cases.firstname;
  this.lastname = cases.lastname;
  this.email = cases.email;
  this.password = cases.password;
  this.line_token = cases.line_token;
  this.role_id = cases.role_id;
  this.active = cases.active;
  this.token = cases.token;
  this.hash = cases.hash;
  this.phone = cases.phone;
  this.number = cases.number;
  this.moo = cases.moo;
  this.soi = cases.soi;
  this.districtsId = cases.districtsId;
  this.amphureId = cases.amphureId;
  this.provinceId = cases.provinceId;
  this.shphId = cases.shphId;
  this.UID = cases.UID;
};

Case.create = (newUser, result) => {
  const news = [{
    email: newUser.email,
    role_id: newUser.role_id,
    password: bcrypt.hashSync(newUser.password, 8),
    firstname:newUser.firstname,
    lastname:newUser.lastname,
    line_token:newUser.line_token,
    active:newUser.active,
    token:newUser.token,
    phone:newUser.phone,
  number : newUser.number,
  moo : newUser.moo,
  soi : newUser.soi,
  districtsId : newUser.districtsId,
  amphureId : newUser.amphureId,
  provinceId : newUser.provinceId,
  shphId : newUser.shphId,
  UID : newUser.UID,
  }];
  sql.query("INSERT INTO  users SET ?", news, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created cases: ", { id: res.insertId, ...newCase });
    result(null, { id: res.insertId, ...news });
  });
};

Case.getmenuarray = (id, result) => {
  sql.query(`SELECT CONCAT('[', GROUP_CONCAT(CONCAT(menu_id)), ']') as menu FROM role_menu WHERE role_id = '${id}'`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found casess: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Case.getmenu = (id, result) => {
  sql.query(`SELECT m.name,m.url FROM role_menu rm join menus m on rm.menu_id = m.id WHERE rm.role_id = '${id}' order by m.no`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found casess: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Case.findById = (id, result) => {
  sql.query(`SELECT u.* FROM  users u WHERE u.id  = '${id}'`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found casess: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Case.signin = (req, result) => {
  // console.log(req);
    sql.query(`SELECT u.UID,u.type,u.line_token,u.email,u.id,u.role_id,u.active,u.password,u.firstname,u.lastname,u.shphId FROM users as u WHERE u.email = '${req.email}'`, (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
//         console.log("found user: ", res[0].password);
//   console.log(req.password);
        // console.log(passwordIsValid);
        if (req.type == 'token') {
            var token = jwt.sign({ id: res[0].id }, config.secret, {
                expiresIn: 86400 // 24 hours
              });
              data = {
                id: res[0].id,
                role_id: res[0].role_id,
                firstname: res[0].firstname,
                lastname: res[0].lastname,
                line_token:res[0].line_token,
                accessToken:token,
                email:res[0].email,
                shphId:res[0].shphId,
                UID:res[0].UID,
                type:res[0].type
              }
              result(null, data);
              return;
        }else{            
        var passwordIsValid = bcrypt.compareSync(
            req.password,
            res[0].password
          );
        if (passwordIsValid) {
          var token = jwt.sign({ id: res[0].id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          data = {
            id: res[0].id,
            role_id: res[0].role_id,
            firstname: res[0].firstname,
            lastname: res[0].lastname,
            line_token:res[0].line_token,
            accessToken:token,
            email:res[0].email,
            shphId:res[0].shphId
          }
          result(null, data);
          return;
        }else{
          result({ kind: "not_found" }, null);
        }
    }
      }else{
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      }
    });
  };

// Case.signin = (req, result) => {
//   // console.log(req);
//   sql.query(`SELECT * from users WHERE email = '${req.email}'`, (err, res) => {
//     if (err) {
//       // //console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       // //console.log("found user: ", res[0]);

//       var passwordIsValid = bcrypt.compareSync(
//         req.password,
//         res[0].password
//       );
//       if (passwordIsValid) {
//         var token = jwt.sign({ id: res[0].id }, config.secret, {
//           expiresIn: 86400 // 24 hours
//         });
//         data = {
//           id: res[0].id,
//           email: res[0].email,
//           role_id: res[0].role_id,
//           accessToken:token
//         }
//         result(null, data);
//         return;
//       }else{
//         result({ kind: "not_found" }, null);
//       }
//     }else{

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//     }
//   });
// };

Case.getKey = (key, result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT * FROM users";
  if (key) {
    query += ` WHERE user_key = '${key}'`;
  }
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res[0]);
  });
};

Case.getbytoken = (id, result) => {
  console.log(`SELECT * FROM users WHERE token = '${id}'`);
  sql.query(`SELECT * FROM users WHERE token = '${id}'`, (err, res) => {
    console.log(err);
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

Case.token = (id, datas, result) => {
  console.log(id);
  sql.query(
  "UPDATE users SET active = ? WHERE token = ?",
  [1,id],(err, res) => {
    console.log(err);
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

Case.getMenuAll = (name, result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT * FROM menus order by no asc";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res);
  });
};

Case.getRole = (name, result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT * FROM roles";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res);
  });
};

Case.getdatabyrole = (role,shphId, result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT * FROM users u";
  if (role) {
    query += ` WHERE u.role_id = ${role} and u.firstname is not null`;
  }
  if (shphId) {
    query += ` and u.shphId = ${shphId}`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res);
  });
};

Case.getdoctor = (name,result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT * FROM users u WHERE (u.role_id = 1 or u.role_id = 4 or u.role_id = 7) and u.active = 1 and u.firstname is not null";
  if (name) {
    query += ` and u.email = '${name}' and u.active = 1`;
  }
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res);
  });
};

Case.searchUID = (uid, result) => {
  // let query = "SELECT * FROM report";
  let query = `SELECT u.id,u.firstname,u.lastname,u.UID  FROM users u where u.UID= '${uid}'`;
  
  // console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res[0]);
  });
};

Case.getAll = (name,roleId, result) => {
  // let query = "SELECT * FROM report";
  let query = "SELECT u.phone,u.firstname,u.lastname,u.id,u.email,u.password,r.id as role_id, r.name as role_name,u.line_token FROM users u join roles r on u.role_id = r.id";
  if (name) {
    query += ` and u.email = '${name}' and u.active = 1`;
  }
  if (roleId == 1) {
    query +=  ` where u.role_id = 7`
  }
  // if (roleId == 3 || roleId == 5) {
  //   query +=  ` where u.role_id = 7`
  // }
  query += ` order by r.no`;
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res);
  });
};
Case.updatetokenline = (id, datas, result) => {
  // console.log(id);
  sql.query(
  "UPDATE users SET line_token = ? WHERE id = ?",
  [datas.line_token,id],(err, res) => {
    console.log(err);
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
Case.updateById = (id, cases, result) => {
  console.log(id);
  if(cases.password != cases.hash){
    cases.password = bcrypt.hashSync(cases.password, 8)
  }
  sql.query(
    "UPDATE  users SET firstname=?,lastname=?,email = ?,password = ? ,role_id = ?,line_token = ? ,phone = ?,number=?,moo=?,soi=?,provinceId=?,amphureId=?,districtsId=?,shphId=? WHERE id  = ?",
    [cases.firstname,cases.lastname,cases.email,cases.password,cases.role_id ,cases.line_token,cases.phone,cases.number,cases.moo,cases.soi,cases.provinceId,cases.amphureId,cases.districtsId,cases.shphId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("updated cases: ", { id: id, ...cases });
      result(null, { id: id, ...cases });
    }
  );
};


Case.remove = (id, result) => {
  sql.query("UPDATE users set active = 0 WHERE id = ?", id, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted cases with id: ", id);
    result(null, res);
  });
};

Case.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} casess`);
    result(null, res);
  });
};

module.exports = Case;