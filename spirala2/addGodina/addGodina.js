function provjeri(){
    var poruka=document.getElementById("poruka");
    var repvjezbe=document.getElementById("vjezbe");
    var repspirala=document.getElementById("spirala");
    var godina=document.getElementById("naziv");
    var validacija=new Validacija(poruka);
    var pomocna3=validacija.godina(godina);
    var pomocna1=validacija.repozitorij(repvjezbe,/^[2][0][0-9][0-9]\/[2][0][0-9][0-9]$/);
    var pomocna2=validacija.repozitorij(repspirala,/^[2][0][0-9][0-9]\/[2][0][0-9][0-9]$/);
    return pomocna1 && pomocna2 && pomocna3;
}