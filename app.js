const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'assets')))

app.use(bodyParser.urlencoded({
    extended:false
}));

app.set('view engine','ejs');
app.set('views','views');

app.get('/api/getData',(req,res)=>{
    fs.readFile('links.json',(err,data)=>{
        let links = [];
        if(!err) {
            links = JSON.parse(data);
        }
        links = links.filter(link => new Date(link.dueDate+'T'+link.dueTime)-new Date()>0 || isNaN(new Date(link.dueDate+'T'+link.dueTime)-new Date()));
        
        fs.writeFile('links.json',JSON.stringify(links),err=>{
            console.log(err);
            links = links.filter(link=>link.type==='link');
            res.status(200).json(links);
        })
        
    })
});

app.get('/api/getEmail',(req,res)=>{
    fs.readFile('links.json',(err,data)=>{
        let links = [];
        if(!err) {
            links = JSON.parse(data);
        }
        links = links.filter(link=>link.type==='email');
        res.status(200).json(links);
    })
});

app.get('/api/getEmails')

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/add-link',(req,res)=>{
    fs.readFile('links.json',(err,data)=>{
        let links = [];
        if(!err) {
            links = JSON.parse(data);
        }
        const { title,link,dueDate,dueTime,nameFormat,fileType,note,type } = req.body;
        const id = v4();
        const newLink = {
            title,
            link,
            id,
            dueDate,
            dueTime,
            nameFormat,
            fileType,
            note,
            type: type==='email'?'email':'link'
        }
        links.push(newLink);
        fs.writeFile('links.json',JSON.stringify(links),(err)=>{
            if(err) console.log(err);
        });
        res.redirect('/');
    })
})

app.post('/api/delete-link',(req,res)=>{
    console.log(req.body);
    fs.readFile('links.json',(err,data)=>{
        let links = [];
        if(!err) {
            links = JSON.parse(data);
        }
        
        links = links.filter(link=>link.id!==req.body.id);
        
        fs.writeFile('links.json',JSON.stringify(links),err=>{
            console.log(err);
            res.redirect('/');
        })
        
    })
    res.redirect('/');
})

app.listen(PORT,()=>console.log('Server is running.'));