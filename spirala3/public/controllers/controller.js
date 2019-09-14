var fs=require('fs');
var multer=require('multer');
var path=require('path');

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
    res.render('addStudent');
 });
 app.get('/addGodina.html', function(req,res){ 
    res.render('addGodina');
 });
 app.get('/addVjezba.html', function(req,res){ 
    res.render('addVjezba');
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
        if(fs.existsSync('./public/json/'+req.body.naziv+'Zad.json')){
            res.status(404).render('greska', {data: "Zadatak sa imenom " + req.body.naziv +" vec postoji."});
            return;}
            //ako ne postoji kreiraj ga
            var zadatak={
                naziv: req.body.naziv,
                postavka: 'http://localhost:8080/pdf/'+ req.file.filename
            };
            var data = JSON.stringify(zadatak);
            fs.writeFile('./public/json/'+req.body.naziv + 'Zad.json', data, (err) => {  
                if (err) throw err;
                console.log('Data written to file');
                res.json(zadatak);
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
   //ako postoji pdf nadji ga i ocitaj
   if(fs.existsSync('./public/json/'+req.query.naziv+'Zad.json')){
   fs.readdir('./public/json', function(err, files){
    files.forEach(file =>{
    fs.readFile('./public/json/' + file, (err, data) => {  
        if (err) throw err;
        var parametri = JSON.parse(data);
        if(parametri.naziv==req.query.naziv){
        var filePath=parametri.postavka.replace("http://localhost:8080/pdf/", "");
        fs.readFile('./public/uploads/' + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
        }
        });
   });
   });
   }
    //ako ne postoji izbaci gresku
    else{
        res.status(404).render('greska', {data: "Zadatak sa imenom " + req.query.naziv +" ne postoji."});
        return;
    }

});


//zadatak4
app.post('/addGodina', function(req,res){ 
    fs.readFile("./public/godine.csv", function(error, sadrzaj){
        if(error){
            console.log(error);
        }
        //provjeri jel postoji naziv godine, ako postoji greska
        else{
            var tekst=sadrzaj.toString();
            var redovi=tekst.split("\n");
            for(var i=0; i<redovi.length; i++){
                var kolone=redovi[i].split(",");
                if(kolone[0]==req.body.nazivGod){
                res.status(400).render('greska', {data: "Godina sa nazivom " + req.body.nazivGod + " već postoji"});
                return;
                }
            }
        }
        //ako je prvi red
        if(sadrzaj.toString()=="") var data=req.body.nazivGod + ', ' + req.body.nazivRepVje + ', ' + req.body.nazivRepSpi;
        //ako su ostali redovi
        else var data='\n'+req.body.nazivGod + ', ' + req.body.nazivRepVje + ', ' + req.body.nazivRepSpi;
        console.log(req.body);
        fs.appendFile('./public/godine.csv', data, function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
        res.render('addGodina');
      });
    });
});

//zadatak5
app.get('/godine', function(req,res){ 
    fs.readFile("./public/godine.csv", function(error, sadrzaj){
        if(error){
            console.log(error);
        }
        if(sadrzaj==""){
            res.status(404).render('greska', {data: "Godine nisu unijete" });
        }
        else{
            var tekst=sadrzaj.toString();
            var redovi=tekst.split("\n");
            var niz=[];
            for(var i=0; i<redovi.length; i++){
                var kolone=redovi[i].split(",");
                var objekat={
                    nazivGod:kolone[0],
                    nazivRepVje:kolone[1],
                    nazivRepSpi:kolone[2]
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
        fs.readdir('./public/json', function(err, files){
            //if(files.length==0) res.status(404).render('greska', {data: "Zadaci nisu unijeti" });
            var niz=[];
            for(var i=0; i<files.length; i++){
            var file=files[i];
            var data=fs.readFileSync('./public/json/' + file);
            var parametri = JSON.parse(data);
            var obj={
                naziv: parametri.naziv,
                postavka: parametri.postavka
            }
            niz.push(obj);
            }
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(niz));
        });
    } 
    for(var i=0; i<headeri.length; i++) if(json.test(headeri[i])) {ima=1; break;}
    if(ima==1) { //ako ima json naveden kao header 
        fs.readdir('./public/json', function(err, files){
            var niz=[];
            for(var i=0; i<files.length; i++){
            var file=files[i];
            var data=fs.readFileSync('./public/json/' + file);
            var parametri = JSON.parse(data);
            var obj={
                naziv: parametri.naziv,
                postavka: parametri.postavka
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
            
            fs.readdir('./public/json', function(err, files){
                for(var i=0; i<files.length; i++){
                var file=files[i];
                var data=fs.readFileSync('./public/json/' + file);
                var parametri = JSON.parse(data);
                var zadatak=new XMLNode("zadatak");
                xmll.addChild(zadatak);
                var naziv= new XMLNode("naziv", parametri.naziv);
                var postavka=new XMLNode("postavka", parametri.postavka);
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
        fs.readdir('./public/json', function(err, files){
            var niz=[];
            for(var i=0; i<files.length; i++){
            var file=files[i];
            var data=fs.readFileSync('./public/json/' + file);
            var parametri = JSON.parse(data);
            var obj={
                naziv: parametri.naziv,
                postavka: parametri.postavka
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
};

