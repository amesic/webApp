function provjeri(){
    var poruka=document.getElementById("poruka");
    var repvjezbe=document.getElementById("vjezbe");
    var repspirala=document.getElementById("spirala");
    var godina=document.getElementById("naziv");
    var validacija=new Validacija(poruka);
    var pomocna3=validacija.godina(godina);
    var pomocna1=validacija.repozitorij(repvjezbe,/^([A-Z]*[a-z]*[0-9]*)*$/);
    var pomocna2=validacija.repozitorij(repspirala,/^([A-Z]*[a-z]*[0-9]*)*$/);
    return pomocna1 && pomocna2 && pomocna3;
}
window.onload=function(){
    var divSadrzaj=document.getElementById("sadrzaj");
    var ajax= new GodineAjax(divSadrzaj);
    //ajax.osvjezi();
}