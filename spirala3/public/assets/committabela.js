var CommitTabela=(function(){
    //lokalne variable idu ovdje
    //…
    var y;
    var regex=/\d+/g;
    var konstruktor=function(divElement,brojZadataka){
    //…a kreira se novi table element, divElement treba da sadrži samo tabelu kreiranu kroz modul.
    y=brojZadataka;
    if((y=regex.exec(y))==null) {
        alert("Unesi broj zadataka!");
        return -1;
    }
    if(divElement.hasChildNodes()) divElement.removeChild(divElement.firstChild); //ako postoji stara tabela izbrisi
    var tabela = document.createElement("table"); //kreiramo novu
    tabela.id="commiti";
    divElement.appendChild(tabela); //dodamo na div novu

    tabela.style.height  = '50%';
    tabela.style.border = '1px solid black';
    tabela.style.margin = "3%";
    tabela.style.textAlign="center";
    tabela.style.borderCollapse="collapse";
    tabela.style.backgroundColor="#8ADFB4"
    
    for(var i=0; i<Number(brojZadataka)+1; i++){
        var tr=tabela.insertRow();
        if(i==0){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('Naziv zadatka'));
            td.style.padding= '2.5%';
            td.style.border= '1px solid';
            td = tr.insertCell();
            td.appendChild(document.createTextNode('Commiti'));
            td.id="kolonacommiti";
            td.style.border= '1px solid';
        }
        else{
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('Zadatak '+ String(i)));
            td.style.border= '1px solid';
        }
    }
    return{
    dodajCommit:function(rbZadatka,url){ //dodaje u red rbZadatka novu kolonu
        y=rbZadatka;
        regex=/\d+/g;
        if((y=regex.exec(y))==null || Number(rbZadatka)>Number(brojZadataka)-1) {
        alert("Nevalidan broj reda!");
        return -1;
        }
        y=url;
        regex=/((http)|(https)|(ftp)|(ssh))\:\/\/(([a-z]|[A-Z])+\.)*([a-z]|[A-Z])+(\/((([a-z]|[A-Z])+\/)*([a-z]|[A-Z])+))*(\?((([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\&\&(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=)*(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+){0,1}/;
        if((y=regex.exec(y))==null) {
        alert("Unesi url zadatka!");
        return -1;
        }
        var td=document.getElementById("commiti").rows[Number(rbZadatka)+1].insertCell();
        td.style.border= '1px solid';
        var link = document.createElement("a");
        link.setAttribute("href", url);
        var brojlinka=document.getElementById("commiti").rows[Number(rbZadatka)+1].cells.length-1;
        var linkText = document.createTextNode(String(brojlinka));
        link.appendChild(linkText);
        td.appendChild(link);
        var max=document.getElementById("commiti").rows[1].cells.length-1;
        for(var i=1; i<document.getElementById("commiti").rows.length; i++){
            alert("Broj komita "+document.getElementById("commiti").rows[i].cells.length+' colspan ' +document.getElementById("commiti").rows[i].colSpan);
        if(max<document.getElementById("commiti").rows[i].cells.length-1) max=document.getElementById("commiti").rows[i].cells.length-1;
        }
        alert(max);
        document.getElementById("kolonacommiti").setAttribute('colSpan', String(max));
    },
    editujCommit:function(rbZadatka,rbCommita,url){//mijenja url commita ili vraća -1 ukoliko su pogrešni parametri.
        y=rbZadatka;
        regex=/\d+/g;
        if((y=regex.exec(y))==null || Number(rbZadatka)>Number(brojZadataka)-1) {
        alert("Nevalidan broj reda!");
        return -1;
        }
        y=rbCommita;
        regex=/\d+/g;
        if(Number(rbCommita)<0 || Number(rbCommita)>document.getElementById("commiti").rows[Number(rbZadatka)+1].cells.length-2 || (y=regex.exec(y))==null){
        alert("Nevalidan broj kolone!");
        return -1;  
        }
        y=url;
        regex=/((http)|(https)|(ftp)|(ssh))\:\/\/(([a-z]|[A-Z])+\.)*([a-z]|[A-Z])+(\/((([a-z]|[A-Z])+\/)*([a-z]|[A-Z])+))*(\?((([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\&\&(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=)*(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+){0,1}/;
        if((y=regex.exec(y))==null) {
        alert("Unesi url zadatka!");
        return -1;
        }
        document.getElementById("commiti").rows[Number(rbZadatka)+1].cells[Number(rbCommita)+1].firstChild.setAttribute("href", url);        
    },
    obrisiCommit:function(rbZadatka,rbCommita){//briše commit ili vraća -1 ukoliko su pogrešni parametri
        y=rbZadatka;
        regex=/\d+/g;
        if((y=regex.exec(y))==null || Number(rbZadatka)>Number(brojZadataka)-1) {
        alert("Nevalidan broj reda!");
        return -1;
        }
        y=rbCommita;
        regex=/\d+/g;
        if(Number(rbCommita)<0 || Number(rbCommita)>document.getElementById("commiti").rows[Number(rbZadatka)+1].cells.length-2 || (y=regex.exec(y))==null){
        alert("Nevalidan broj kolone!");
        return -1;  
        }
        document.getElementById("commiti").rows[Number(rbZadatka)+1].deleteCell(Number(rbCommita)+1);

    }
    }
    }
return konstruktor;
}());
    