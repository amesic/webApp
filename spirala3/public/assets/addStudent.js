function provjeri(){
    var ime=document.getElementById("ime");
    var index=document.getElementById("index");
    var poruka=document.getElementById("poruka");
    var validacija=new Validacija(poruka);
    var pomocna=validacija.ime(ime);
    var pomocna1=validacija.index(index);
    return (pomocna && pomocna1);
}