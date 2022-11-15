const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const { reset } = require('nodemon');

require("dotenv").config()

app.use(cors());
app.use(bodyParser.json());
const propertyData = {
	property_id:null,
	price_per_night:null,
	av_from_date:null,
	av_to_date:null,
	images:[]
};

const saltRounds = 10;

const db=mysql.createConnection({
	host:'localhost',
        database:process.env.DATABASE,
        user:'root',
        password:process.env.PASSWORD,
        socketPath:'/var/run/mysqld/mysqld.sock',
		timezone: 'Z',
});

app.post("/api/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
	console.log(email,password);
	const verify = `select password,user_id from login where email="${email}"`
	db.query(verify, (err, result) => {
		if (err || result===undefined || result.length==0){
			res.send({"status": "User does not exist"})
		} else{
			console.log(result[0].password);
			bcrypt.compare(password, result[0].password, (err, status) => {
				console.log(status);
				if (status===true){
					console.log(status);
					const user_info = `select * from user where user_id="${result[0].user_id}"`
					console.log(user_info);
					db.query(user_info, (err, info) => {
						const payload = info[0];
						if (err){
							res.send({"status": "An unknown error occurred, kindly wait"})
						} else{
							res.send({'status': true, ...payload})
						}
					})
				} else{
					res.send({"status": "Password does not match"})
				}
			})
		}
	})
})

app.post("/api/signup", (req,res) => {
    const user_id = req.body.user_id;
	const email = req.body.email;
	const password = req.body.password;
    const phone = req.body.phone;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const lastname = req.body.lastname;
    const dob = req.body.dob;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const login = `insert into login(email,password,user_id) values("${email}", "${hash}", "${user_id}")`
            const user = `insert into user(\`user_id\`,\`firstname\`,\`middlename\`,\`lastname\`,\`dob\`,\`phone\`,\`isHost\`) values ("${user_id}","${firstname}","${middlename}","${lastname}",DATE "${dob}","${phone}",b'0');`;
			const flag = true;
			db.beginTransaction(function(err){
				if (err){
					console.log(1);
					console.log(err);
					res.send({'status': 'No'});
					flag = false
				}
				if (flag===true){
					db.query(login, (err, result) => {
						if (err){
							console.log(2);
							console.log(err);
							db.rollback(function() {
								if (result===undefined){
									res.send({'status': 'User already exists'})
									res.end();
								}
							})
						}
					})
				}
				if (flag===true){
					db.query(user,(err, result) => {
						if (err){
							console.log(3);
							console.log(err);
							db.rollback(() => {
								res.send({'status': 'No'});
								flag=false;
							})
						}
					})
				}
				if (flag===true){
					db.commit((err) => {
						if (err){
							console.log(4);
							console.log(err);
							db.rollback(() => {
								res.send({'status': 'No'});
							})
						} else{
							res.send({'status': true});
						}
					})
				}
			})
        })
    })
})

app.post("/api/property_info", (req,res) => {
	const property_id = req.body.property_id;
	const info = `select property.*,user.*,address.city,address.state,address.country from property join has_property on has_property.property_id=property.property_id join user on user.user_id=has_property.user_id join address on address.addr_id=property.addr_id where property.property_id="${property_id}";`;
	db.query(info, (err, result) => {
		if (err){
			res.send({'status': false})
		} else{
			res.send(result[0])
		}
	})
})

var getDaysArray=function(start,end,arr){
	for(dt=new Date(start);dt<=new Date(end); dt.setDate(dt.getDate()+1)){
		arr.push((new Date(dt)).toISOString().split('T')[0]);
	}
	return arr;
}

app.post("/getAmenities", (req, res) => {
	const property_id = req.body.property_id;
	const amenities = `select amenity from has_amenity where property_id="${property_id}"`
	db.query(amenities, (err, result) => {
		console.log(result);
		res.send([...result]);
	})
})

app.get("/searchResults",(req,res)=>{
	const location="Pune";
	const checkIn="2022-11-11";
	const checkOut="2022-11-20";
	const wantedDate=new Set(getDaysArray(checkIn,checkOut,[]));
	const noOfDays=wantedDate.size;
	console.log(checkIn);
	console.log(checkOut)
	const query=`select * from property join address on property.addr_id=address.addr_id where city='${location}' and av_from_date<='${checkIn}' and av_to_date>='${checkOut}'`;
	db.query(query,(err,results)=>{
		console.log(results);
		if(err){
			console.log(err)
		}
		else{
			let properties = [];
			results=results.map(v=>Object.assign({},v));
			for(var i=0;i<results.length;i++){
				var totalAv=getDaysArray(results[i].av_from_date,results[i].av_to_date,[]);
				console.log(totalAv);
				var bookedDates=[];
				var amenities=[];
				const property_id=results[i].property_id;
				const query2=`select * from book join booking on book.booking_id=booking.booking_id where property_id='${property_id}'`
				db.query(query2,(e,r)=>{
					console.log("-----");
					console.log(r);
					if(e){
						console.log(e)
					}
					else{
						for(var j=0;j<r.length;j++){
							bookedDates=getDaysArray(r[j].check_in_date,r[j].check_out_date,bookedDates);
						}
						console.log("87:",amenities);
						console.log("88:",bookedDates);
						totalAv=new Set(totalAv);
						var booked_dates=new Set(bookedDates);
						totalAv=new Set([...totalAv].filter(x=>!booked_dates.has(x)))
						console.log(totalAv);
						temp=new Set([...totalAv].filter(x=>wantedDate.has(x)));
						console.log("189:",temp);
						if(temp.size>0){
							properties.push({property_id,noOfDays,amenities})
						}
					}
				})
			}
			console.log("194:",properties)
		}
	})	
})

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
			       JOIN (SELECT property_id,JSON_EXTRACT(JSON_ARRAYAGG(JSON_OBJECT('image_id',image_id,'url',image_url)),'$') as images from property_has_images group by property_id) as i
				   ON p.property_id=i.property_id
				   JOIN address a
				   ON p.addr_id = a.addr_id`;

	db.query(query2,(err,results)=>{
		if(err){
			console.log(err);
		}else{
			console.log(results);
			res.send(results);
		}
	});
});

app.listen(Number(process.env.PORT),()=>{
	console.log(`Server is running on port ${process.env.PORT}`);
})
