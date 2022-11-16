const express= require('express');
const app=express();
const bodyParser = require('body-parser');
const cors=require('cors');
const bcrypt = require("bcrypt");
const { reset } = require('nodemon');
const uuid=require('uuid');
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config()

// const propertyData = {
// 	property_id:null,
// 	price_per_night:null,
// 	av_from_date:null,
// 	av_to_date:null,
// 	images:[]
// };
const saltRounds = 10;
const mysql=require('mysql');
const db=mysql.createConnection({
	host:'localhost',
	database:process.env.DATABASE,
	user:'root',
	password:process.env.PASSWORD,
	socketPath:'/var/run/mysqld/mysqld.sock',
	timezone: 'Z',
});

const mysql2 =require('mysql2/promise');
const db2=mysql2.createConnection({
	host:'localhost',
	database:process.env.DATABASE,
	user:'root',
	password:process.env.PASSWORD,
	timezone: 'Z'
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
							console.log('yaya')
							res.send({'status': true});
						}
					})
				}
			})
        })
    })
})

app.post("/api/property_info", (req,res) => {
	console.log("136:",req.body)
	const property_id = req.body.property_id;
	const info = `select property.*,user.*,address.city,address.state,address.country from property join has_property on has_property.property_id=property.property_id join user on user.user_id=has_property.user_id join address on address.addr_id=property.addr_id where property.property_id="${property_id}";`;
	console.log(info);
	db.query(info, (err, result) => {
		console.log(result[0]);
		if (err){
			res.send({'status': false})
		} else{
			res.send(result[0])
		}
	})
})

// async function getBookings(property_id){
// 	const query=`select * from book join booking on book.booking_id=booking.booking_id where property_id='${property_id}'`
// 	const rows=(await db2).query(query);
// 	return rows;
// }

app.post("/getBookedDates", async (req, res) => {
	const property_id = req.body.property_id;
	const data = getBookings(property_id);
	let bookedDates = [];
	await data.then(async (results) => {
		for (let i=0; i<results[0].length; i++){
			bookedDates = await getDaysArray(results[0][i].check_in_date, results[0][i].check_out_date, bookedDates);
		}
		console.log(bookedDates);
		res.send(bookedDates)
	})
})

var getDaysArray=function(start,end,arr){
	for(dt=new Date(start);dt<=new Date(end); dt.setDate(dt.getDate()+1)){
		arr.push((new Date(dt)).toISOString().split('T')[0]);
	}
	return arr;
}

app.post("/addRemoveWishlist",async (req,res)=>{
	const user_id=req.body.user_id;
	const property_id=req.body.property_id;
	const state=req.body.state;
	console.log(user_id,property_id,state)
	const query1=`insert into wishlist (guest_id,property_id) values ('${user_id}','${property_id}')`
	const query2=`delete from wishlist where guest_id='${user_id}' and property_id='${property_id}'`
	if(state===0){
		const result=(await db2).query(query1);
		result.then(function(result){
			console.log(result[0])
			res.send({'status':'Done'})
		})
	}
	else{
		const result=(await db2).query(query2);
		result.then(function(result){
			console.log(result[0]);
			res.send({'status':'Done'})
		})
	}
})

app.post("/getWishlist", (req, res) => {
	const user_id = req.body.user_id;
	const props = `select property.*,address.* from wishlist join property on property.property_id=wishlist.property_id join address on address.addr_id=property.addr_id where wishlist.guest_id="${user_id}"`;
	db.query(props, (err, results) => {
		if (err){
			res.send({'status': false});
		} else{
			if (results==='undefined' || results.length===0){
				res.send({'status': true, props: []});
			} else{
				res.send({'status': true, props: [...results]})
			}
		}
	})
})

app.post("/confirmBooking",async (req,res)=>{
	const uid=req.body.user_id;
	console.log(uid)
	const property_id=req.body.property_id;
	const total_price=req.body.total_price;
	const guests=req.body.guests;
	const checkIn=req.body.checkIn.split('T')[0];
	const checkOut=req.body.checkOut.split('T')[0];
	const noOfGuests=guests.adults+guests.children+guests.infants;
	const id=uuid.v4();
	const query1=`insert into booking values ('${id}',now(),now(),${total_price},${noOfGuests},'${checkIn}','${checkOut}')`
	const query2=`insert into book values ('${uid}','${property_id}','${id}')`
	const result=(await db2).query(query1);
	result.then(async function(result){
		const r=(await db2).query(query2);
		r.then((rr)=>{
			res.send({"status":"Done"})
		})
	})
})

async function showProp(){
	const query=`SELECT p.property_id,p.price_per_night,p.av_from_date,p.av_to_date,i.images,a.city,a.country 
	from property p
	JOIN (SELECT property_id,JSON_EXTRACT(JSON_ARRAYAGG(JSON_OBJECT('image_id',image_id,'url',image_url)),'$') as images from property_has_images group by property_id) as i
	ON p.property_id=i.property_id
	JOIN address a
	ON p.addr_id = a.addr_id`;
	const result=(await db2).query(query);
	return result;
}

app.get('/showproperty',(req,res)=>{
	const data=showProp();
	data.then(function(result){
		res.send(result[0])
	})
});

app.post('/getImages', async (req, res) => {
	const property_id = req.body.property_id;
	const images = `select * from property_has_images where property_id="${property_id}"`
	db.query(images, (err, results) => {
		res.send(results);
	})
})

app.post("/getAmenities", (req, res) => {
	const property_id = req.body.property_id;
	const amenities = `select amenity,description from has_amenity where property_id="${property_id}"`
	db.query(amenities, (err, result) => {
		console.log(result);
		res.send([...result]);
	})
})

app.post("/getRules", (req, res) => {
	const property_id = req.body.property_id;
	const amenities = `select rule,description from has_rules where property_id="${property_id}"`
	db.query(amenities, (err, result) => {
		console.log(result);
		res.send([...result]);
	})
})

async function getAvailableProperty(location,checkIn,checkOut,noOfGuests){
	const query=`select temp.*,wishlist_id from (select property.*,addr_line,city,state,country from property join address on property.addr_id=address.addr_id where city='${location}' and av_from_date<='${checkIn}' and av_to_date>='${checkOut}') as temp left join wishlist on temp.property_id=wishlist.property_id`;
	const rows=(await db2).query(query)
	return rows;
}
async function getBookings(property_id){
	const query=`select * from book join booking on book.booking_id=booking.booking_id where property_id='${property_id}'`
	const rows=(await db2).query(query);
	return rows;
}
async function getAmenities(property_id){
	const query=`select amenity from has_amenity where property_id='${property_id}'`
	const rows=(await db2).query(query);
	return rows;
}

async function getImages(property_id){
	const query = `select * from property_has_images where property_id="${property_id}"`
	const images = (await db2).query(query);
	return images
}

app.post("/searchResults",async(req,res)=>{
	const guests = req.body.guests;
	console.log("308:",guests)
	const noOfGuests = guests.adults+guests.children+guests.infants;
	const location=req.body.location;
	const checkIn=req.body.checkIn.split('T')[0];
	const checkOut=req.body.checkOut.split('T')[0];
	const wantedDate=new Set(getDaysArray(checkIn,checkOut,[]));
	const noOfDays=wantedDate.size;
	const data1=getAvailableProperty(location,checkIn,checkOut,noOfGuests);
	var properties=[]
	await data1.then(async function(results){
		for(var i=0;i<results[0].length;i++){
			var totalAv=getDaysArray(results[0][i].av_from_date,results[0][i].av_to_date,[]);
			var bookedDates=[];
			var amenities=[];
			var images = [];
			var data3=getAmenities(results[0][i].property_id);
			var data4 = getImages(results[0][i].property_id);
			await data3.then(async function(re){
				for(var k=0;k<re[0].length;k++){
					amenities.push(re[0][k].amenity);
					// console.log("88:",amenities)
				}
			})
			await data4.then(async function(re){
				for (var k=0; k<re[0].length; k++){
					images.push(re[0][k])
				}
			})
			var data2=getBookings(results[0][i].property_id);
			await data2.then(async function(r){
				for(var j=0;j<r[0].length;j++){
					bookedDates=await getDaysArray(r[0][j].check_in_date,r[0][j].check_out_date,bookedDates);
				}
			})
			var booked_date=new Set(bookedDates);
			var ta=new Set(totalAv);
			ta=new Set([...ta].filter(x=>!booked_date.has(x)));
			temp=new Set([...ta].filter(x=>wantedDate.has(x)));
			if(temp.size){
				properties.push({...results[0][i],noOfDays,amenities,images})
			}
		}
		console.log(properties)
		res.send(properties)
	})
})

app.post("/getHostedProps", (req, res) => {
	const user_id = req.body.user_id;
	const props = `select property.*,address.* from has_property join property on has_property.property_id=property.property_id join address on address.addr_id=property.addr_id where has_property.user_id="${user_id}"`;
	db.query(props, (err, results) => {
		console.log(results);
		if (err){
			res.send({"status": false})
		} else{
			if (results==='undefined' && results?.length===0){
				res.send({status: true, props: []});
			} else{
				res.send({status: true, props: [...results]})
			}
		}
	})
})

app.post("/removeProp", (req, res) => {
	const property_id = req.body.property_id;
	const unlist = `update property set listed=b'0' where property_id="${property_id}"`;
	db.query(unlist, (err, results) => {
		if (err){
			res.send({"status": false});
		} else{
			res.send({'status': "Done"})
		}
	})
})

app.post("/listProp", (req, res) => {
	const property_id = req.body.property_id;
	const unlist = `update property set listed=b'1' where property_id="${property_id}"`;
	db.query(unlist, (err, results) => {
		if (err){
			res.send({"status": false});
		} else{
			res.send({'status': "Done"})
		}
	})
})

app.post("/getBookedProps", (req, res) => {
	const user_id = req.body.user_id;
	const props = `select property.*,address.*,booking_id from book join property on book.property_id=property.property_id join address on property.addr_id=address.addr_id where book.guest_id="${user_id}"`;
	db.query(props, (err, results) => {
		if (err){
			console.log(err);
			res.send({"status": false})
		} else{
			if (results==='undefined' && results?.length===0){
				res.send({status: true, props: []});
			} else{
				res.send({status: true, props: [...results]})
			}
		}
	})
})

app.post("/removeBooking",async (req,res)=>{
	const user_id=req.body.user_id;
	const property_id=req.body.property_id;
	const booking_id=req.body.booking_id;
	
	const query1=`delete from booking where booking_id='${booking_id}'`;
	console.log(booking_id,query1);
	const data=(await db2).query(query1);
	data.then((result)=>{
		res.send({"status":"Done"})
	})
})

app.post("/deleteProperty",async (req,res)=>{
	const property_id=req.body.property_id;
	const query=`delete from has_property where property_id='${property_id}'`;
	const data=(await db2).query(query);
	data.then((result)=>{
		res.send({"status":"Done"})
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
	console.log(req.body.FormResponse);
	res.status(200).send('');
})

app.listen(3003,()=>{
	console.log("Server is running on port 3003!!!!");
})
