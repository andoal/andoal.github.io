/* ARXIU DE CONFIGURACIÓ DE LA WEB APP:
    Guardem variables d'estat, configuracions... que es fan servir durant tot el temps de vida de la webApp
*/

var activeFilter = 0;           // Filtre visual actiu, comencem per un filtre neutre.
const maxFilter  = 2;           // El CSS està preparat per una col·lecció de filtres, indiquem quants d'ells volem actius

var cameraStatus = false        // FALSE=OFF - TRUE=ON
var video        = undefined;   // Element contenidor de vídeo, es fa servir sovint, el podem enmagatzemar per comoditat i millora de rendiment (velocitat).
var mediaStream;                // Apuntador a la font de vídeo provinent de la webCam
var canvas;                     // Apuntado e l'element canvas de la webApp


// https:://www.google.com/amp/s/stijndewitt.com/2014/01/26/enums-in-javascript/amp/
// Podríem fer servir data-??? per enmagatzemar aquesta informació

// Possibles estats de l'aplicació i fluxe d'activació:
//      Webcam off  <--> Webcam on <---+
//            /\-------- Canvas on <---+ 
var webCamStates = {
    off:    1, 
    on:     2,
    canvas: 3
 };
 // Estat actiu (per defecte desactivat)  
var webCamState = webCamStates.disabled;
// Seleccionar i carregar l'idioma actiu
var messages = ESP;




