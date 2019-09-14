function prikazi(){
     if(document.getElementById('dodaj').checked==true) document.getElementById('zadodaj').style.display="block";
     else document.getElementById('zadodaj').style.display="none";
     if(document.getElementById('edituj').checked==true) document.getElementById('zaedituj').style.display="block";
     else document.getElementById('zaedituj').style.display="none";
     if(document.getElementById('izbrisi').checked==true) document.getElementById('zaizbrisi').style.display="block";
     else document.getElementById('zaizbrisi').style.display="none";
}
var divTabele;
var brojZadataka;
var tabela;
function kreirajTabelu(){
    divTabele=document.getElementById("tabela");
    brojZadataka=document.getElementById("brojZadataka").value;
    tabela=new CommitTabela(divTabele, brojZadataka);
}
function dodajComm(){
    var y=brojZadataka;
    var regex=/\d+/g;
    if((y=regex.exec(y))==null) {
        alert("Kreiraj tabelu!");
        return -1;
    }
    var url=document.getElementById('urlD').value;
    var rbZadatka=document.getElementById('brojRedaD').value;
    tabela.dodajCommit(rbZadatka, url);    
}
function editujComm(){
    var y=brojZadataka;
    var regex=/\d+/g;
    if((y=regex.exec(y))==null) {
        alert("Kreiraj tabelu!");
        return -1;
    }
    var rbZadatka=document.getElementById('brojRedaE').value;
    var rbCommita=document.getElementById('brojKoloneE').value;
    var url=document.getElementById('urlE').value;
    tabela.editujCommit(rbZadatka, rbCommita, url);
}
function izbrisiComm(){
    var y=brojZadataka;
    var regex=/\d+/g;
    if((y=regex.exec(y))==null) {
        alert("Kreiraj tabelu!");
        return -1;
    }
    var rbZadatka=document.getElementById('brojRedaI').value;
    var rbCommita=document.getElementById('brojKoloneI').value;
    tabela.obrisiCommit(rbZadatka, rbCommita);
}
