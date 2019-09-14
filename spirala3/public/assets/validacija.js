var Validacija=(function(){
//lokalne variable idu ovdje
var y;
var pomocna;
var regexzaSve=/(ime)|(url)|(password)|(godina)|(repozitorij)|(naziv)|(index)/;
var konstruktor=function(divElementPoruke){
//...
return{
ime:function(inputElement){
    const regex=/^[A-Z]{1}([a-z]+\')*[a-z]+((\s|\-)[A-Z]{1}([a-z]+\')*[a-z]+){0,3}$/;
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/ime/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " ime";
        return false;
    }
    else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/ime/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }
},

godina:function(inputElement){
    const regex=/^[2][0][0-9][0-9]\/[2][0][0-9][0-9]$/; //za format
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/godina/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " godina";
        return false;
    }
    else if((y=regex.exec(y))!=null){
        reg=/\d+/g;
        var godine = String(y).match(reg).map(Number);
        if(godine[0]!=godine[1]-1){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/godina/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " godina";
        return false;
        }
        else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/godina/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
        }

    }

},
repozitorij:function(inputElement,regex){
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/repozitorij/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " repozitorij";
        return false;
    }
    else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/repozitorij/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }
},
index:function(inputElement){
    const regex=/^([1][4-9]|[2][0])[0-9]{3}$/;
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/index/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " index";
        return false;
    }
    else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/index/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }
},
naziv:function(inputElement){
    const regex=/^[a-z]+([a-z]+|[0-9]+|(\\|\/|\-|\"|\'|\!|\?|\:|\;|\,)+)+([a-z]|[0-9])$/;
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/naziv/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " naziv";
        return false;
    }
    else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/naziv/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }

},
password:function(inputElement){
    const regex1=/(([a-z][a-z]*([A-Z]|[0-9]))|([A-Z][A-Z]*([a-z]|[0-9]))|([0-9][0-9]*([a-z]|[A-Z])))([a-z]*[A-Z]*[0-9]*)*/;
    const regex2=/([a-z]|[A-Z]|[0-9]){8,}/; //za broj slova
    y=inputElement.value;
    if((y=regex1.exec(y))==null || (y=regex2.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/password/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " password";
        return false;

    }
    else{
        inputElement.style.background="none";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/password/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }
},
url:function(inputElement){
    const regex=/((http)|(https)|(ftp)|(ssh))\:\/\/(([a-z]|[A-Z])+\.)*([a-z]|[A-Z])+(\/((([a-z]|[A-Z])+\/)*([a-z]|[A-Z])+))*(\?((([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\&\&(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+\=)*(([a-z]|[0-9])+\-*)*([a-z]|[0-9])+){0,1}/;  
    y=inputElement.value;
    if((y=regex.exec(y))==null){
        inputElement.style.background="orangered";
        divElementPoruke.style.display="block";
        const reg=/url/;
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=reg.exec(pomocna))==null) divElementPoruke.innerHTML += " url";
        return false;
    }
    else{
        inputElement.style.background="white";
        divElementPoruke.innerHTML=divElementPoruke.innerHTML.replace(/url/,"");
        pomocna=divElementPoruke.innerHTML;
        if((pomocna=regexzaSve.exec(pomocna))==null) divElementPoruke.style.display="none";
        return true;
    }
}
    }
    }
    return konstruktor;
}());