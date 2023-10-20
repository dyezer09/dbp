import express from "express";
import path from "path";
import bodyParser from 'body-parser';
import fs from 'fs';
import format from "date-format";
//import { constants } from "fs";
const __dirname = path.resolve();
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
let text = fs.readFileSync('hz.txt', 'utf8');
let upBd,downBd;


app.post("/",function(req,res){
    let date = format.asString('dd-mm-yy', new Date());
    let time  = format.asString('hh:mm', new Date());
    let str = date + ' ' + time +  ': ' + req.body.upBd + '  |  ' + req.body.downBd + '\n';
    fs.appendFileSync("hz.txt",str);
    res.send(str);
});


app.get("/",function(req,res){
    res.sendFile(__dirname + `/index.html`);
});

app.get("/all",function(req,res){
     res.sendFile(__dirname + `/hz.txt`);
 });

app.listen(5500,()=>{
    console.log("start");
});