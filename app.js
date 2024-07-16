const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const Users = require('./modules/users');
const { where } = require("sequelize");

//Config 
    //Handlebars
        //Template Engines
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true, 
                allowProtoMethodsByDefault: true
            },
        }));
        app.set('view engine', 'handlebars');

    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Routes
    //Get Routes
    app.get('/favicon.ico', (req, res)=>{
        const options = {
            root: path.join(__dirname + "/views/icons/")
        };

        const favicon = 'cat.png';
        res.sendFile(favicon, options, (err)=>{
            if(err){ console.log("Error sending file: ", err) }
            else{ console.log("Sent File: ", favicon) }
        });
    });

    app.get('/', (req, res)=>{
        Users.findAll().then((user)=>{
            res.render('list', {users: user});
        })
    });
    
    app.get('/page', (req, res)=>{
        res.render('form');
    });

    app.get('/about', (req, res)=>{
        res.render('about');
    });

    app.get('/del/:id', (req, res)=>{
        Users.destroy({where: {'id': req.params.id} }).then(()=>{
            res.redirect("/")
        }).catch((err)=>{
            res.send(`Erro Inesperado ao deletar usuário: ${err}`)         
        })
    })

    app.get('/edit/:name', (req, res)=>{
        res.render('edit', { name: req.params.name})
    })

    //Post Routes
    app.post('/form', (req, res)=>{
        if (req.body.name !=="" && req.body.passwd !=="") {
            Users.create({
                name: req.body.name,
                passwd: req.body.passwd
            }).then(()=>{
                res.redirect("/")
            }).catch((err)=>{
                `Houve um problema ao se cadastrar [ERRO]: ${err}`
            })
        }else{
            return  console.log("Erro dados vazios")   
        }
    })

    app.post('/edit/update', (req, res)=>{
        if (req.body.name !=="" && req.body.passwd !=="") {
            Users.update({
                name: req.body.name,
                passwd: req.body.passwd
            }, {
                where : {name : req.body.oldname}
            }).then(()=>{
                res.redirect("/")
            }).catch((err)=>{
                `Houve um problema ao se cadastrar [ERRO]: ${err}`
            })
        }else{
            return  console.log("Erro dados vazios")   
        }
    })

    //Start App
    app.listen(8081, (err)=>{ if(!err){console.log("Server running on 8081")} else{console.log(`Error running server ${err}`)}  });