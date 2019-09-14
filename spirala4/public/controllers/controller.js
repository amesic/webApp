var fs=require('fs');
var multer=require('multer');
var path=require('path');
const db = require('../bazawt2018/db');
var zadaci=[];
var studenti=[];
var godine=[];
var vjezbe=[];
db.sequelize.sync();

module.exports=function(app){
//zadatak1
app.get('/login.html', function(req,res){ //kada korisnik ode na adresu '/login.html' funkcija se izvrsava
   res.render('login');
});
app.get('/studenti.html', function(req,res){ 
   res.render('studenti');
});
app.get('/zadaci.html', function(req,res){ 
    res.render('zadaci');
 });
 app.get('/commiti.html', function(req,res){ 
    res.render('commiti');
 });
 app.get('/addZadatak.html', function(req,res){ 
    res.render('addZadatak');
 });
 app.get('/addStudent.html', function(req,res){ 
    db.godina.findAll().then(function(godine){
        res.render('addStudent',{godine: godine});
    });
 });
 app.get('/addGodina.html', function(req,res){ 
    res.render('addGodina');
 });
 //nadji za svaki vjezbu njene zadatke
 function nadjiVjezbaZadatak(vjezbe,niz,callback){
    vjezbe.forEach(function(vjezbica){
        vjezbica.getZadaci().then(function(resSet){
            if(resSet==""){
            var obj={
                nazivV: vjezbica.naziv,
                nazivZ: "nema"
            }
            niz.push(obj);
        }
            else{
            var nizpom=[];
            resSet.forEach(zadatakVjezbe => {
                nizpom.push(zadatakVjezbe.naziv);
            });
            var obj={
                nazivV: vjezbica.naziv,
                nazivZ: nizpom
            }
            niz.push(obj);
        }
                callback();
          });
    });
}
 app.get('/addVjezba.html', function(req,res){
    db.godina.findAll().then(function(godine){
        db.vjezba.findAll().then(function(vjezbe){
            db.zadatak.findAll().then(function(zadaci){
                var niz=[];
                if(vjezbe==""){res.render('addVjezba',{godine: godine, vjezbe:vjezbe, zadaci:zadaci, vjezbazadaci:niz});}
                else{
                nadjiVjezbaZadatak(vjezbe,niz,function(){
                    if(niz.length==vjezbe.length)
                    res.render('addVjezba',{godine: godine, vjezbe:vjezbe, zadaci:zadaci, vjezbazadaci:niz});
                });
            }
            });
        });
    });
});

//zadatak2
app.post('/addZadatak', function(req,res){

//priprema imena pdfa i gdje ga treba spasiti
const storage=multer.diskStorage({
    destination:'./public/uploads/',
    filename: function(req,file,callback){
        callback(null,req.body.naziv+path.extname(file.originalname));
    }
});
//init upload
const upload=multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        checkFileType(file, callback);
    }
}).single('postavka');
//provjeri jel pdf
function checkFileType(file, callback){
    const filetypes=/pdf/;
    const extname=filetypes.test(path.extname(file.originalname));
    const mimetype=filetypes.test(file.mimetype);
    if(mimetype && extname){
        return callback(null,true);
    }
    else{
        callback('greska');
    }
}
upload(req, res, function(err){
    if(err){
        res.status(403).render('greska', {data: "Format nije .pdf"});
        return;
    }
    else{
        //provjeri jel vec postoji sa tim imenom zadatak
        db.zadatak.findOne({where:{naziv:req.body.naziv}}).then(function(zadatakk){
            //ako postoji izbaci gresku
            if(zadatakk!=null){
                res.status(400).render('greska', {data: "Zadatak sa imenom " + req.body.naziv +" već postoji."});
                return;
            }
            else{
            //ako ne postoji kreiraj ga
            //ubacivanje u bazu tabele zadatak
                return new Promise(function(resolve,reject){
                    zadaci.push(db.zadatak.create({naziv:req.body.naziv, postavka: 'http://localhost:8080/pdf/'+ req.file.filename}));
                   Promise.all(zadaci).then(function(zadatak){
                       var objekat={
                           naziv:zadatak[zadatak.length-1].naziv,
                           postavka:zadatak[zadatak.length-1].postavka
                       }
                       res.json(objekat);
                   });
                });
            }
        });
       }
   });
});

//zadatak3
app.get('/zadatak', function(req,res){ 
   //ako ukucamo npr http://localhost:8080/zadatak?naziv=Zadatak1
   if(req.query.naziv==undefined){
    res.status(400).render('greska', {data: "Pogrešan url za zadatak. Probaj kao zadatak?naziv=nazivZadatka"});
    return;
   }
    db.zadatak.findOne({where:{naziv:req.query.naziv}}).then(function(zadatakk){
        //ako ne postoji izbaci gresku
        if(zadatakk==null){
            res.status(404).render('greska', {data: "Zadatak sa imenom " + req.query.naziv +" ne postoji."});
            return;
        }
        //redirektaj ako ima
        else{
        res.contentType("application/pdf");
        res.redirect(zadatakk.postavka);
        }
    });

});


//zadatak4
app.post('/addGodina', function(req,res){ 
    db.godina.findOne({where:{nazivGod:req.body.nazivGod}}).then(function(godinaa){
        //ako ne postoji dodaj u tabelu godina
        if(godinaa==null){
          return new Promise(function(resolve,reject){
                godine.push(db.godina.create({nazivGod:req.body.nazivGod, nazivRepSpi:req.body.nazivRepSpi, nazivRepVje:req.body.nazivRepVje}));
               Promise.all(godine).then(function(godina){
                   console.log(godina[godina.length-1].nazivGod);
                res.render('addGodina');
               });
            });
        }
        //ako postoji vrati gresku
        else{
            res.status(400).render('greska', {data: "Godina sa nazivom " + req.body.nazivGod + " već postoji"});
            return;
        }

    });
});
//zadatak5
app.get('/godine', function(req,res){ 
    db.godina.findAll().then(function(godine){
        if(godine==""){
            res.status(404).render('greska', {data: "Godine nisu unijete" });
            return;
        }
        else{
            console.log('poziva');
            var niz=[];
            for(var i=0; i<godine.length; i++){
                var objekat={
                    nazivGod:godine[i].nazivGod,
                    nazivRepVje:godine[i].nazivRepVje,
                    nazivRepSpi:godine[i].nazivRepSpi
                 }
                 niz.push(objekat);
        }
        res.contentType("application/json");
        res.end(JSON.stringify(niz));
        }
    });
});
//zadatak 7
app.get('/zadaci', function(req,res){ 
    //u json,xml pa csv-redoslijed
    var accept=req.headers.accept;
    console.log(accept);
    var headeri=accept.split(",");
    var xml=/xml/;
    var json=/json/;
    var csv=/csv/;
    var ima=0;
    if(accept=='*/*') { //ako nije definisan header
        db.zadatak.findAll().then(function(zadaci){
            var niz=[];
            for(var i=0; i<zadaci.length; i++){
                var obj={
                    naziv: zadaci[i].naziv,
                    postavka: zadaci[i].postavka
                }
                niz.push(obj);
            }
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(niz));
        });
    } 
    for(var i=0; i<headeri.length; i++) if(json.test(headeri[i])) {ima=1; break;}
    if(ima==1) { //ako ima json naveden kao header 
        db.zadatak.findAll().then(function(zadaci){
            var niz=[];
            for(var i=0; i<zadaci.length; i++){
                var obj={
                    naziv: zadaci[i].naziv,
                    postavka: zadaci[i].postavka
                }
                niz.push(obj);
            }
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(niz));
        });
    }
    else { 
        for(var i=0; i<headeri.length; i++) if(xml.test(headeri[i])) {ima=1; break;}
        if(ima==1) {
            const XML = require('xml-library');
            const XMLNode = XML.XMLNode;
            var xmll = new XMLNode("zadaci");
            db.zadatak.findAll().then(function(zadaci){
                for(var i=0; i<zadaci.length; i++){
                var zadatak=new XMLNode("zadatak");
                xmll.addChild(zadatak);
                var naziv= new XMLNode("naziv", zadaci[i].naziv);
                var postavka=new XMLNode("postavka", zadaci[i].postavka);
                zadatak.addChild(naziv);
                zadatak.addChild(postavka);
                }
                res.writeHead(200, {"Content-Type": "application/xml"});
                xmll.asXMLString(function(err,data){
                res.end(data);
            });
            });
        }
    else {
        for(var i=0; i<headeri.length; i++) if(csv.test(headeri[i])) {ima=1; break;}
        if(ima==1) { //ako ima samo csv 
        db.zadatak.findAll().then(function(zadaci){
            var niz=[];
            for(var i=0; i<zadaci.length; i++){
                var obj={
                    naziv: zadaci[i].naziv,
                    postavka: zadaci[i].postavka
                }  
                niz.push(obj);
            } 
            res.writeHead(200, {"Content-Type": "text/csv"});
            var stringify = require('csv-stringify');
            stringify(niz, function(err, output){
                res.end(output);
            });
        });
    }
}
}
 });
 //zadatak 2a,2b
app.post('/addVjezba', function(req,res){
    //post sa fNova
    if(req.body.vjezbaX!=undefined){
        console.log(req.body.sGodine);
        db.vjezba.findOne({where:{naziv:req.body.vjezbaX}}).then(function(vjezbaa){
            //ako vjezba ne postoji kreiraj
            if(vjezbaa==null){
            var jeste=false;
            if(req.body.spirala=='on') jeste=true;
            db.vjezba.create({naziv:req.body.vjezbaX, spirala:jeste}).then(function(v){
            db.godina.findOne({where:{id:req.body.sGodine}}).then(function(godinaa){
            v.addGodine([godinaa]);
            return new Promise(function(resolve,reject){resolve(v);
                db.godina.findAll().then(function(godine){
                    db.vjezba.findAll().then(function(vjezbe){
                        db.zadatak.findAll().then(function(zadaci){
                            var niz=[];
                            nadjiVjezbaZadatak(vjezbe,niz,function(){
                                if(niz.length==vjezbe.length)
                                res.render('addVjezba',{godine: godine, vjezbe:vjezbe, zadaci:zadaci, vjezbazadaci:niz});
                            });
                        });
                    });
                });
            });
        })
    })
        }
            //ako vjezba vec postoji vrati gresku
            else{
            res.status(400).render('greska', {data: "Vjezba sa nazivom " + req.body.vjezbaX + " već postoji"});
            return;
            }
    }); 
}
    //post sa fPostojeca
    else{
        if(req.body.sVjezbe==null) {res.status(404).render('greska', {data: "Vjezbe nisu unijete!"}); return;}
        db.godina.findOne({where:{id:req.body.sGodine}}).then(function(godinaa){
            db.vjezba.findOne({where:{id:req.body.sVjezbe}}).then(function(vjezbaa){
                vjezbaa.addGodine([godinaa]);
            return new Promise(function(resolve,reject){resolve(vjezbaa);
                db.godina.findAll().then(function(godine){
                    db.vjezba.findAll().then(function(vjezbe){
                        db.zadatak.findAll().then(function(zadaci){
                            var niz=[];
                            nadjiVjezbaZadatak(vjezbe,niz,function(){
                                if(niz.length==vjezbe.length)
                                res.render('addVjezba',{godine: godine, vjezbe:vjezbe, zadaci:zadaci, vjezbazadaci:niz});
                            });
                        });
                    });
                });
                });
            });
        });

    }


});
//zadatak 2c
app.post('/vjezba/:idVjezbe/zadatak', function(req,res){
    var v=req.params.idVjezbe;
    if(v=='Izaberi vjezbu') {res.status(404).render('greska', {data: "Vjezba nije izabrana!"}); return;}
    if(req.body.sZadatak==null) {res.status(404).render('greska', {data: "Zadaci nisu dodani!"}); return;}
    db.vjezba.findOne({where:{id:v}}).then(function(vjezbaa){
        db.zadatak.findOne({where:{naziv:req.body.sZadatak}}).then(function(zadatakk){
            zadatakk.addVjezbe([vjezbaa]).then(function(parametar){
                db.godina.findAll().then(function(godine){
                    db.vjezba.findAll().then(function(vjezbe){
                        db.zadatak.findAll().then(function(zadaci){
                            var niz=[];
                            nadjiVjezbaZadatak(vjezbe,niz,function(){
                                if(niz.length==vjezbe.length){
                                res.render('addVjezba',{godine: godine, vjezbe:vjezbe, zadaci:zadaci, vjezbazadaci:niz});
                                console.log(niz);
                                }
                            });
                        });
                    });
               });
            });
        });
    });

});
//zadatak 3a
app.post('/student', function(req,res){
   var nizStudenata=req.body;
   var upisano=0;
   var dodano=0;
   var brojac=0;
   var idGodine=nizStudenata.godina;
   nizStudenata.studenti.forEach(function(s){
   db.student.findOne({where:{index:s.index}}).then(function(studentt){
    //ako student ne postoji kreiraj
    if(studentt==null){
        return new Promise(function(resolve,reject){
        studenti.push(db.student.create({imePrezime:s.imePrezime, index:s.index}));
        dodano++;
           Promise.all(studenti).then(function(student){
               //upisi ga na godinu
            db.godina.findOne({where:{id:idGodine}}).then(function(godinaa){
                godinaa.addStudenti([student[student.length-1]]);
                return new Promise(function(resolve,reject){
                    resolve(godinaa);
                    upisano++; 
                    brojac++; 
                if(brojac==nizStudenata.studenti.length){
                    var obj={
                        message:"Dodano je " + dodano + " novih studenata i upisano " + upisano + " na godinu " + godinaa.nazivGod
                    }
                res.json(obj);
                }
            });
            });
           });
        });
}
    else{
        //postoji, samo ga upisi na godinu
        db.godina.findOne({where:{id:idGodine}}).then(function(godinaa){
        godinaa.getStudenti({where:{index:studentt.index}}).then(function(resSet){
            //ako su svi poslani dodani na godinu
            if (resSet!="") {
                brojac++;
                if(brojac==nizStudenata.studenti.length){
                    var obj={
                        message:"Dodano je " + dodano + " novih studenata i upisano " + upisano + " na godinu " + godinaa.nazivGod
                    }
                res.json(obj);
                }
            }
            //ako nisu
        else{
        godinaa.addStudenti([studentt]);
        return new Promise(function(resolve,reject){
            resolve(godinaa);
            upisano++;
            brojac++; 
            if(brojac==nizStudenata.studenti.length){
                var obj={
                    message:"Dodano je " + dodano + " novih studenata i upisano " + upisano + " na godinu " + godinaa.nazivGod
                }
            res.json(obj);
            }
            
        });
    }
        });
    });
    }
});
});
});
};


