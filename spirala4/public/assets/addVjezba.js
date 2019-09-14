function provjeri(){
    var naziv=document.getElementById("naziv");
    var poruka=document.getElementById("poruka");
    var validacija=new Validacija(poruka);
    return validacija.naziv(naziv);
}
function namjestiAction(){
    var idVjezbe=document.getElementById("sVjezbe").value;
    document.getElementById("sub3").formAction='/vjezba/' + idVjezbe + '/zadatak';
}

function naVjezbu(poslaniZadaci, vjezbaZadaci) {
    poslaniZadaci=JSON.parse(poslaniZadaci);
    vjezbaZadaci=JSON.parse(vjezbaZadaci);
    var zadacii = document.getElementById("sZadatak");
    zadacii.innerHTML="";
    var vjezbee = document.getElementById("sVjezbe");
    var izabranaVjezba= vjezbee.options[vjezbee.selectedIndex].text;
    //var izabranaVjezba=document.getElementById("sVjezbe").text;
    console.log(izabranaVjezba);
    var vjezba=vjezbaZadaci.filter(function(a){return a.nazivV===izabranaVjezba})[0];
    if(vjezba.nazivZ!='nema') {
     var pomocni=[];
     poslaniZadaci.forEach((z2)=> {pomocni.push(z2.naziv)});
     let novi = pomocni.filter(x => ! vjezba.nazivZ.includes(x));
     novi.forEach((n)=>{var v= "<option>"+ n + "</option>"; 
     zadacii.innerHTML += v; });
    }
    else{
        poslaniZadaci.forEach((z2)=> {
            var v= "<option>"+ z2.naziv + "</option>"; 
            zadacii.innerHTML= zadacii.innerHTML + v;
        });

    }
}