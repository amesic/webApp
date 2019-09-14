function provjeri(){
    var ime=document.getElementById("ime");
    var index=document.getElementById("index");
    var poruka=document.getElementById("poruka");
    var validacija=new Validacija(poruka);
    var pomocna=validacija.ime(ime);
    var pomocna1=validacija.index(index);
    return (pomocna && pomocna1);
}
var kreirana=false;
var bbucket;
var nizStudenata;
function kreiraj(godine){
    var key=document.getElementById("key").value;
    var secret=document.getElementById("secret").value;
    if(kreirana==false){
    bbucket = new BitBucket(key,secret);
    kreirana=true;
    }
    godine=JSON.parse(godine);
    var god=document.getElementById("sGodine");
    var naziv=god.options[god.selectedIndex].text;
    var izabrana=godine.filter(function(a){return a.nazivGod===naziv})[0];
    function ispisi(greska,x){
        if(greska==null) {
        nizStudenata={
            godina:izabrana.id,
            studenti:x
        }
        console.log("Lista studenata:\n"+JSON.stringify(x)); 
        document.getElementById("dodaj").disabled=false;
    }
    }
    bbucket.ucitaj(izabrana.nazivRepSpi, izabrana.nazivRepVje,ispisi);
}
function postZahtjev(){
    var jsonstr=JSON.stringify(nizStudenata);
    document.getElementById("dodaj").disabled=true;
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState ==4 && ajax.status==200){
            alert(ajax.responseText);
        }
    }
    ajax.open("POST","http://localhost:8080/student");
    ajax.setRequestHeader('Content-Type','application/json');
    ajax.send(jsonstr);
}