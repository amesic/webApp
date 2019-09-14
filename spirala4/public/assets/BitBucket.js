var BitBucket=(function(key,secret){
    var konstruktor=function(){
return {
ucitaj: function(nazivRepSpi, nazivRepVje,callback){
    var niz1=[];
    niz1.push({
        imePrezime: "Mujo Mujic",
        index: "17495"
    });
    niz1.push({
        imePrezime: "Pero Peric",
        index: "17494"
    });
    niz1.push({
        imePrezime: "Haso Hasic",
        index: "17491"
    });
    callback(null,niz1);
}
        }
    }
    return konstruktor;
}());