const express = require('express');
const router = express.Router();
const executer = require('../helpers/mysqlExecuter')
const auth = require("../middlewares/middleware")

router.get('/listUsers', auth.authentication(), function(req, res, next) {
  executer.executeQuery(["Select * from user"]).then(function (result) {
    console.log(result)
    return res.json({result})
  })
});

router.post('/createUser', auth.authentication(), function(req, res, next) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let mobile = req.body.mobile;

  let regex = /^[A-Za-z]+$/;
  let Email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let mobile_regex = /^[789]\d{9}$/;
  if (!firstName || regex.test(firstName) == false) {
    res.status(403).send({
        message: "Invalid First name"
    });
  } else if (!lastName || regex.test(lastName) == false){
    res.status(403).send({
      message: "Invalid Last name"
    });
  } else if (!email || Email_regex.test(email) == false) {
      res.status(403).send({
          message: "Invalid Email"
      });
  } else if (!mobile || mobile_regex.test(mobile) == false) {
      res.status(403).send({
          message: "Invalid mobile"
      });
  } else {
  let query = "INSERT INTO `user` (`firstName`,`lastName`,`mobile`,`email`) VALUES ('"+firstName+"','"+lastName+"','"+mobile+"','"+email+"')";
    executer.executeQuery([query]).then(function (result) {
      console.log(result)
      return res.json({result})
    }).catch(function(err){
      console.log(err)
      if(err && err.sqlMessage && err.sqlMessage.includes("Duplicate entry")){
        if(err.sqlMessage.includes("mobile")){
          res.status(409).send({
            message: "Mobile already exist"
         });
        } else if(err.sqlMessage.includes("email")){
          res.status(409).send({
            message: "Email already exist"
         });
        }
      }
    })
  }
});

module.exports = router;
