const express= require('express');
const app=express();
const bodyParser = require('body-parser');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.json());
const propertyData = {};

const mysql =require('mysql');
const db=mysql.createConnection({
	host:'localhost',
        database:'airbnb_dbms',
        user:'root',
        password:'Wf@MNAkj9tyL',
        socketPath:'/var/run/mysqld/mysqld.sock'
});

app.get('/showproperty',(req,res)=>{
	const query = `select p.property_id,p.price_per_night,p.av_from_date,p.av_to_date,
					i.image_id,i.image_url,a.city,a.country
					from property p
					join property_has_images i
					on p.property_id = i.property_id
					join address a
					on p.addr_id = a.addr_id`;
	db.query(query,(err,results)=>{
		if(err){
			console.log(err);
		}else{
			res.send(results);
		}
	});
});











app.listen(3003,()=>{
	console.log("Server is running on port 3003");
})
