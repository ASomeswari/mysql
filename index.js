const mysql= require("mysql")
const express = require('express')
const bodyParser= require('body-parser')
//const mysqlConnection = require("./connection")

//const StudentRouter = require("./router/student")
 
const app=express()
app.use(bodyParser.json())

//app.use("/student",StudentRouter)

var mysqlConnection =mysql.createConnection({
    host:"localhost",
    user:"someswari",
    //password:"Someswari@2204",
    database:"someswari_mysql",
    multipleStatements:true
})

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('connected')
    else
    console.log('not connected')
})


app.get("/student",(req,res) => {
    mysqlConnection.query('SELECT * FROM student',(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }
        else
            console.log('error')
    })

})

app.get("/student/:id",(req,res) => {
    mysqlConnection.query('SELECT * FROM student WHERE ID=?',[req.params.id],(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }
        else
            console.log('error')
    })

})



app.delete("/student/:id",(req,res) => {
    mysqlConnection.query('DELETE FROM student WHERE ID = ?',[req.params.id],(err,rows,fields) => {
        if(!err){
            res.send('deleted rows successfully')
        }
        else
            console.log('error')
    })

})
app.put('/student/:id', (req, res)=> {
    let user = req.body
    let updateQuery = `update student 
                       set name = '${user.name}',
                       branch = '${user.branch}',
                       dateofbirth = '${user.dateofbirth}'
                       where id =${user.id}`
                       

    mysqlConnection.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    mysqlConnection.end
})

app.post('/student', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into student(id, name, branch, dateofbirth) 
                       values(${user.id}, '${user.name}', '${user.branch}', '${user.dateofbirth}')`

    mysqlConnection.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    mysqlConnection.end

})





app.listen(3000,() => {
    console.log('server is on port 3000')
})