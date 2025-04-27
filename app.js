const mysql=require('mysql');
const express=require('express');
const path=require('path');

const app=express();
app.use(express.json());

//mysql connection

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1#subha@7',
    database: 'myCollege'
});

db.connect((err)=>{
    if (err) throw err;
    console.log('Connected to mysql');
});
app.use(express.urlencoded({extended:true}));

//serve html form

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

// insert student 
app.post('/students',(req,res)=>{
    const {id,name}=req.body;
    const sql='INSERT INTO Student (id,name) values (?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if(err)
            console.error('error inserting data',err);
        console.log('inserted student',id);
        res.send('student successfully added to the DB');
    });
});

//start server

app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});