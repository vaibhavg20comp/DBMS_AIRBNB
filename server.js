const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const uuid = require('uuid');

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

    const query = `select username from user where username=${username} and password=${password}`;
    console.log(query);

    connection.query(query, (err, result) => {
        if (err || result.length==0){
            res.send({'status': false})
        }
        console.log(result[0].isHost);
        let data = {
            username: result[0].username,
            isHost: result[0].isHost
        }
        res.send({'status': true, 'data': data})
    })
})

app.post("/api/signup", (req,res) => {
    const data = req.body.data;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
            const query = `insert into user(user_id,username,firstname,middlename,lastname,dob,email,phone,password,isHost) values (${data.user_id},${data.username},${data.firstname},${data.middlename},${data.lastname},${data.dob},${data.email},${data.phone},${hash},${data.isHost});`;
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

app.listen(4200, () =>{
    console.log("Running on the Port 4200!");
});
