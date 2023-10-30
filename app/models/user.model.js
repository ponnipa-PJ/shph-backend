const sql = require("./db");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const crypto = require("crypto")

const encrypt = (plainText, password) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex');

  } catch (error) {
    console.log(error);
  }
}

const decrypt = (encryptedText, password) => {
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');

    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error)
  }
}

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
  this.shphId = cases.shphId
  this.adminshphId = cases.adminshphId
  
};
const pass = "gotothemoon2023"

Case.create = (newUser, result) => {
  const encText = encrypt(newUser.UID, pass)
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
  UID : encText,
  shphId:newUser.shphId,
  adminshphId:newUser.adminshphId,
  
  }];
  // console.log(news);
  sql.query("INSERT INTO  users SET ?", news, (err, res) => {
    if (err) {
      console.log("error: ", err);
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
  var list = []
  let header = `SELECT t.icon,t.id,t.name FROM role_menu rm join menus m on rm.menu_id = m.id join types_menu t on m.type_menu_id = t.id WHERE rm.role_id = '${id}' GROUP by t.id;`
  sql.query(header, (err, headers) => {
for (let h = 0; h < headers.length; h++) {
  sql.query(`SELECT m.id,m.icon,m.name,m.url FROM role_menu rm join menus m on rm.menu_id = m.id WHERE rm.role_id = '${id}' and m.type_menu_id = ${headers[h].id} order by m.no`, (err, res) => {
    // console.log(res);
    headers[h].url = res[0].url
    headers[h].menu = res
    // sql.query(`SELECT m.icon,m.name,m.url FROM role_menu rm join menus m on rm.menu_id = m.id WHERE rm.role_id = '${id}' order by m.no`, (err, res) => {
      
    });
  
}
  if (err) {
    //console.log("error: ", err);
    result(err, null);
    return;
  }

  if (headers.length) {
    //console.log("found casess: ", res);
    setTimeout(() => {

      result(null, headers);
  }, 500);
    return;
  }

  // not found Tutorial with the id
  result({ kind: "not_found" }, null);
});
};

Case.findByadminshphId = (id, result) => {
  console.log(id);
  sql.query(`SELECT u.* FROM  users u WHERE u.adminshphId  = ${id}`, (err, res) => {
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

Case.signinperson = (req, result) => {
  // const decText = encrypt(req.UID, pass)
  // const decTexts = decrypt(decText, pass)
  var uid = ''
  // console.log(decText);
  // console.log(decTexts);
  sql.query(`SELECT UID FROM users where UID is not null`, (err, res) => {
    // console.log(res);
    for (let r = 0; r < res.length; r++) {
      // var encryptuid = encrypt(res[r].UID, pass)
      var decryptuid = decrypt(res[r].UID, pass)
      // console.log(decryptuid);
      if (decryptuid == req.UID) {
        // console.log(res[r]);
        uid = res[r].UID
      }
      
    }
    // console.log(uid);
    sql.query(`SELECT u.shphId,u.UID,u.line_token,u.email,u.id,u.role_id,u.active,u.password,u.firstname,u.lastname FROM users as u WHERE u.UID = '${uid}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        // console.log("found user: ", res[0].password);
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
                UID:res[0].UID,
                shphId:res[0].shphId,
              }
              // console.log(data);
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
            UID:res[0].UID,
            shphId:res[0].shphId,
          }
          // console.log(data);
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
  });
  };

Case.signin = (req, result) => {
  // console.log(req);
    sql.query(`SELECT u.shphId,u.UID,u.line_token,u.email,u.id,u.role_id,u.active,u.password,u.firstname,u.lastname FROM users as u WHERE u.email = '${req.email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        // console.log("found user: ", res[0].password);
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
                UID:res[0].UID,
                shphId:res[0].shphId,
              }
              // console.log(data);
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
            UID:res[0].UID,
            shphId:res[0].shphId,
          }
          // console.log(data);
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
  // console.log(query);
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
  // console.log(`SELECT * FROM users WHERE token = '${id}'`);
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
  // console.log(id);
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
  // console.log(query);
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
  var uiddata = ''
  sql.query(`SELECT UID FROM users where UID is not null`, (err, res) => {
    // console.log(res);
    for (let r = 0; r < res.length; r++) {
      // var encryptuid = encrypt(res[r].UID, pass)
      var decryptuid = decrypt(res[r].UID, pass)
      // console.log(decryptuid);
      if (decryptuid == uid) {
        // console.log(res[r]);
        uiddata = res[r].UID
      }
      
    }
    if (uiddata) {
        let query = `SELECT u.id,u.firstname,u.lastname,u.UID  FROM users u where u.UID= '${uiddata}'`;
  
  // console.log(query);
  sql.query(query, (err, res) => {
    res[0].UID = decrypt(res[0].UID, pass)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    result(null, res[0]);
  });
}else{
  result(null, false);
}
});
};

Case.getUID = (UID, result) => {
  // let query = "SELECT * FROM report";
  var list = []
  let query = "SELECT u.UID,u.phone,u.firstname,u.lastname,u.id,u.email,u.password,r.id as role_id, r.name as role_name,u.line_token FROM users u join roles r on u.role_id = r.id where u.active = 1";
  if (UID) {
    query += ` and u.id = ${UID}`
}
  // console.log(query);
  sql.query(query, (err, res) => {

  var decryptuid = decrypt(res[0].UID, pass)
  // console.log(decryptuid);
  res[0].UID = decryptuid
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    setTimeout(() => {

      result(null, res[0]);
  }, 500);

  });
};

Case.checkUID = (UID, result) => {
  // let query = "SELECT * FROM report";
  var list = []
  let query = "SELECT u.UID,u.phone,u.firstname,u.lastname,u.id,u.email,u.password,r.id as role_id, r.name as role_name,u.line_token FROM users u join roles r on u.role_id = r.id where u.active = 1";
  if (UID) {
  var uid = ''
  sql.query(`SELECT id,UID FROM users where UID is not null`, (err, res) => {
    // console.log(res);
    for (let r = 0; r < res.length; r++) {
      // var encryptuid = encrypt(res[r].UID, pass)
      var decryptuid = decrypt(res[r].UID, pass)
      // console.log('decryptuid',decryptuid);
      // console.log(UID);
      if (decryptuid == UID) {
        // console.log(res[r]);
        uid = res[r].id
        let query = "SELECT u.UID,u.phone,u.firstname,u.lastname,u.id,u.email,u.password,r.id as role_id, r.name as role_name,u.line_token FROM users u join roles r on u.role_id = r.id where u.active = 1";

        query +=  ` and u.id = ${uid}`
        // console.log(query);
        sql.query(query, (err, lists) => {
          // console.log(lists);
          list = lists
        });
      }
    }
  })
}
  query += ` order by r.no,u.id`;
  // console.log(query);
  sql.query(query, (err, res) => {
    // console.log(UID);
    // console.log(list);
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    setTimeout(() => {

      result(null, list);
  }, 500);

  });
};

Case.getAll = (name,roleId,UID,userId, result) => {
  // let query = "SELECT * FROM report";
  var list = []
  let query = "SELECT u.UID,u.phone,u.firstname,u.lastname,u.id,u.email,u.password,r.id as role_id, r.name as role_name,u.line_token FROM users u join roles r on u.role_id = r.id where u.active = 1";
  if (name) {
    query += ` and u.email = '${name}'`;
  }
  if (roleId == 1) {
    query +=  ` and u.role_id = 7`
  }
  if (userId) {
    query +=  ` and u.shphId = ${userId} and u.role_id != 2 and u.role_id != 5`
  }
  query += ` order by r.no,u.id`;
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("case_types: ", res);
    setTimeout(() => {

      result(null, res);
  }, 500);

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
  // console.log(id);
  if(cases.password != cases.hash){
    cases.password = bcrypt.hashSync(cases.password, 8)
  }
  sql.query(
    "UPDATE  users SET shphId = ?,firstname=?,lastname=?,email = ?,password = ? ,role_id = ?,line_token = ? ,phone = ?,number=?,moo=?,soi=?,provinceId=?,amphureId=?,districtsId=? WHERE id  = ?",
    [cases.shphId,cases.firstname,cases.lastname,cases.email,cases.password,cases.role_id ,cases.line_token,cases.phone,cases.number,cases.moo,cases.soi,cases.provinceId,cases.amphureId,cases.districtsId, id],
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