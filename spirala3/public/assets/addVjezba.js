function provjeri(){
    var naziv=document.getElementById("naziv");
    var poruka=document.getElementById("poruka");
    var validacija=new Validacija(poruka);
    return validacija.naziv(naziv);
}