const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const uuid = require('uuid');
require('dotenv').config()

const saltRounds = 10;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }));

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
});

app.post("/api/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    const query = `select user_id,username,isHost from user where username=`+mysql.escape(username)+`and password=`+mysql.escape(password)+`;`;
    console.log(query);

    connection.query(query, (err, result) => {
        if (err || result.length==0){
            res.send({'status': false})
        }
        res.send({'status': true, 'user_id': result[0].user_id, 'username': result[0].username,'isHost': result[0].isHost})
    })
})

app.post("/api/signup", (req,res) => {
    const user_id = req.body.user_id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const lastname = req.body.lastname;
    const dob = req.body.dob;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const query = `insert into user(\`user_id\`,\`username\`,\`firstname\`,\`middlename\`,\`lastname\`,\`dob\`,\`email\`,\`phone\`,\`password\`,\`isHost\`) values ("${user_id}","${username}","${firstname}","${middlename}","${lastname}",DATE "${dob}","${email}","${phone}","${hash}",b'1');`;
            connection.query(query,function(err,result){
                if(err){
                console.log(err);
                res.send({'status':'No'});
                }
                else{
                res.send({'status':'Yes'})
                }
            })
        })
    })
})

app.listen(3001, () =>{
    console.log("Running on the Port 3001!");
});
