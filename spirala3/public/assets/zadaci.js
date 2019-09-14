function provjeri(){
    var student=document.getElementById("query");
    var poruka=document.getElementById("poruka");
    var validacija=new Validacija(poruka);
    return validacija.ime(student);
}