/* ARXIU AMB EINES GENÈRIQUES REAPROFITABLES EN ALTRES APP's
*/

function mdlDisableElement(elementName){
    //document.querySelector("#cameraOn").addclass(disabled);
}
function mdlEnableElement(elementName){
    //document.querySelector("#cameraOn").addclass(disabled);
}
function selectFilter(code){
 auxStr="";
 switch(code){
     case 0:
        auxStr="nop";
     break;
     case 1:
        auxStr="saturate(200%) contrast(200%)";
     break;
     case 2:
        auxStr="grayscale(100%) contrast(400%)";
     break;
     
 }
 return auxStr;
}