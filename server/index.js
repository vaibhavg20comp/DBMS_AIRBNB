const express= require('express');
const app=express();
const bodyParser = require('body-parser');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.json());


const mysql =require('mysql');
const db=mysql.createConnection({
	host:'localhost',
        database:'airbnb_dbms',
        user:'root',
        password:'Wf@MNAkj9tyL',
        socketPath:'/var/run/mysqld/mysqld.sock'
});

app.get('/showproperty',(req,res)=>{
	const query1 = `select p.property_id,p.price_per_night,p.av_from_date,p.av_to_date,
					i.image_id,i.image_url,a.city,a.country
					from property p
					join property_has_images i
					on p.property_id = i.property_id
					join address a
					on p.addr_id = a.addr_id`;
	const query2= `SELECT p.property_id,p.price_per_night,p.av_from_date,p.av_to_date,i.images,a.city,a.country 
				   from property p
			       JOIN (SELECT property_id,JSON_ARRAYAGG(JSON_OBJECT('image_id',image_id,'url',image_url)) as images from property_has_images group by property_id) as i
				   ON p.property_id=i.property_id
				   JOIN address a
				   ON p.addr_id = a.addr_id`;
	const query3 = `select json_arrayagg(json_object('image',image_id)) as json from property_has_images`;
	const query4=`SELECT JSON_ARRAY(1, "abc", NULL, TRUE, CURTIME()) as  newarray`;
	db.query(query2,(err,results)=>{
		if(err){
			console.log(err);
		}else{
			var data = JSON.parse(JSON.stringify(results))
			res.send(data);
		}
	});
});


app.post('/becomeHost',(req,res)=>{
	console.log('Event Recieved',req.body.type);
    const {type,data} =req.body;
	console.log('data',data);
	res.status(200).send('');
})








app.listen(3003,()=>{
	console.log("Server is running on port 3003!!!!");
})
