function provjeri(){
var password=document.getElementById("password");
var poruka=document.getElementById("poruka");
var validacija=new Validacija(poruka);
return validacija.password(password);
}