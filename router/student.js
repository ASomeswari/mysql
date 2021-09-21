const express = require("express")
const Router = express.Router()
const mysqlConnection = require("../connection")


Router.get("/student",(req,res) => {
    mysqlConnection.query("SELECT * FROM student",(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }
        console.log('error')
    })

})

module.exports = Router