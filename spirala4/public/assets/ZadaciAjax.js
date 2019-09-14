var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){
        var ajax=new XMLHttpRequest();
        var ima=1;
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200) callbackFn(ajax.response);
            ima=0;
        }
        if(ima) ({greska: 'Već ste uputili zahtjev'});
    return {
    dajXML:function(){
        ajax.open("GET","http://localhost:8080/zadaci");
        ajax.timeout=2000;
        ajax.ontimeout=function(e){};
        ajax.setRequestHeader('Accept','application/xml');
        if(ima==0) ajax.send();
    },
    dajCSV:function(){
        ajax.open("GET","http://localhost:8080/zadaci");
        ajax.timeout=2000;
        ajax.ontimeout=function(e){};
        ajax.setRequestHeader('Accept','text/csv');
        if(ima==0) ajax.send();
    },
    dajJSON:function(){
        ajax.open("GET","http://localhost:8080/zadaci");
        ajax.timeout=2000;
        ajax.ontimeout=function(e){};
        ajax.setRequestHeader('Accept','application/json');
        if(ima==0) ajax.send();
    }
    }
}
    return konstruktor;
}());