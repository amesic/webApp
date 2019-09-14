var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){
        var ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                //uzmi podatke 
                var lista=ajax.responseText;
                var elementi = JSON.parse(lista);
                console.log(elementi);
                for(var i=0; i<elementi.length; i++){
                var parametri=elementi[i];
                var div = document.createElement("div");
                div.className="godine";
                div.style.border="2px solid rgb(32, 78, 18)";
                div.style.background = "rgb(164, 243, 177)";
                div.style.cssFloat="left";
                div.style.marginLeft="2%";
                div.style.marginBottom="3%";
                div.style.padding="5%";
                div.style.display="table-cell";
                var p1=document.createElement("p");
                p1.innerHTML="<strong>Naziv godine: </strong>"+ parametri.nazivGod;
                var p2=document.createElement("p");
                p2.innerHTML="<strong>Repozitorija vjezbi :  </strong>"+ parametri.nazivRepVje;
                var p3=document.createElement("p");
                p3.innerHTML="<strong>Repozitorija spirala : </strong>"+ parametri.nazivRepSpi;
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                divSadrzaj.appendChild(div);
                }

            }
        }
        ajax.open("GET","http://localhost:8080/godine");
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
    return {
    osvjezi:function(){
        var ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                //ako ima sta u div sadrzaj ukloni
                divSadrzaj.innerHTML="";
                //uzmi podatke 
                var lista=ajax.responseText;
                var elementi = JSON.parse(lista);
                console.log(elementi);
                for(var i=0; i<elementi.length; i++){
                var parametri=elementi[i];
                var div = document.createElement("div");
                div.className="godine";
                div.style.border="2px solid rgb(32, 78, 18)";
                div.style.background = "rgb(164, 243, 177)";
                div.style.cssFloat="left";
                div.style.marginLeft="2%";
                div.style.marginBottom="3%";
                div.style.padding="5%";
                div.style.display="table-cell";
                var p1=document.createElement("p");
                p1.innerHTML="<strong>Naziv godine: </strong>"+ parametri.nazivGod;
                var p2=document.createElement("p");
                p2.innerHTML="<strong>Repozitorija vjezbi :  </strong>"+ parametri.nazivRepVje;
                var p3=document.createElement("p");
                p3.innerHTML="<strong>Repozitorija spirala : </strong>"+ parametri.nazivRepSpi;
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                divSadrzaj.appendChild(div);
                }

            }
        }
        ajax.open("GET","http://localhost:8080/godine");
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
    }
    }
}
    return konstruktor;
}());
    