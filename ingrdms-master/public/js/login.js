const loginModule = function () {
  const mysql = require("mysql"),
    pool = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "1234",
      database: "hungry",
    });

  loginModule.prototype.getIngrd = function (uid) {
    return new Promise((res, rej) => {
      pool.on("acquire", (conn) => {
        console.log(
          "LoginModule GetIngrd Connection %d acquired",
          conn.threadId
        );
      });
      pool.on("release", (conn) => {
        console.log(
          "LoginModule GetIngrd Connection %d released",
          conn.threadId
        );
      });
      pool.getConnection((err, conn) => {
        if (err) {
          console.log("LoginModule GetIngrd connection Error");
          throw err;
        }
        conn.query(
          "select * from ingredient_u where user_id = ?",
          uid,
          (err, row) => {
            if (err) {
              console.log("Select Query Error");
              throw err;
            }
            conn.release();
            conn.destroy();
            if (row.length === 0) {
              console.log("No Selection Results(LoginModule Get Ingrd)", row);
              rej();
            } else {
              console.log("Find Ingrd! (LoginModule getIngrd)");
              res(row);
            }
          }
        );
      });
    });
  };
  //한번 더 보자
  loginModule.prototype.addIngrd = function (uid, ingrd) {
    var data = {
      uid: uid,
      ingrd: ingrd,
    };
    return new Promise((res, rej) => {
      pool.on("acquire", (conn) => {
        console.log("Add Ingrd Connection %d acquired", conn.threadId);
      });
      pool.on("release", (conn) => {
        console.log("Add Ingrd Connection %d released", conn.threadId);
      });
      pool.getConnection((err, conn) => {
        if (err) {
          throw err;
        }
        conn.query(
          "select ing_name from ingredient_u where ingUser_id = ? and ing_name = ? ",
          [uid, ingrd],
          (err, row) => {
            if (err) {
              throw err;
            }
            conn.release();
            conn.destroy();
            if (row.length === 0) {
              console.log("AddIngrd Row is null ", row);
              res(data);
            } else {
              console.log("AddIngrd Row is not null", row);
              rej(data);
            }
          }
        );
      });
    })
      .then((data) => {
        pool.getConnection((err, conn) => {
          if (err) {
            throw err;
          }
          conn.query(
            "insert into ingredient_u values(?,?)",
            [data.uid, data.ingrd],
            (err, row) => {
              if (err) {
                throw err;
              }
              console.log("Inserting Success");
              return true;
            }
          );
        });
      })
      .catch(() => {
        console.log("Data is already exsist");
        return false;
      });
  };
  loginModule.prototype.login = function (uid, upw) {
    return new Promise((res, rej) => {
      pool.getConnection((err, conn) => {
        if (err) {
          throw err;
        }
        conn.query("select * from user where user_id = ?", uid, (err, row) => {
          var err_level = null;
          conn.release();
          conn.destroy();
          if (err) {
            throw err;
          }
          if (row.length === 0) {
            err_level = 1;
            rej(err_level);
          } else if (row[0].user_password === upw) {
            res(row[0].user_name);
          } else {
            err_level = 2;
            rej(err_level);
          }
        });
      });
    })
      .then((user_name) => {
        var flag = true;
        return {
          flag: flag,
          user_name: user_name,
        };
      })
      .catch((err_level) => {
        return err_level;
      });
  };
};

loginModule.prototype.setRecipe = function (uid, recipe_id) {
  console.log("Set Recipe Started");
  return new Promise((res, rej) => {
    pool.on("acquire", (conn) => {
      console.log("SetRecipe Connection %d acquired", conn.threadId);
    });
    pool.on("release", (conn) => {
      console.log("SetRecipe Connection %d released", conn.threadId);
    });
    pool.getConnection((err, conn) => {
      if (err) throw err;
      conn.query("select * from user_recipe", (err, row) => {
        conn.release();
        if (err) throw err;
        if (row.length === 0) {
          res();
        } else {
          rej();
        }
      });
    });
  })
    .then(() => {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(uid, recipe_id);
        conn.query(
          "insert into user_recipe values(?,?)",
          [uid, recipe_id],
          (err, row) => {
            conn.release();
            if (err) throw err;
            console.log("insert rows is ", row);
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = loginModule;
