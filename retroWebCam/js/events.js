/* ARXIU d'EVENTS DE LA WEB APP: 
    Arxiu amb els events de la WebApp
*/

// Quan els elements ja existeixin al DOM procedirem a lligar elements amb events. (Abans no seria possible per no existir ;) )
function loadInitialEvents()
{
    // LLISTA D'EVENTS
    // Veurem diferents maneres de lligar els events als elements, serveixi com a demostració i sandBox 
    // Lligar elements <--> events amb funcions amb nom (sense paràmetres) - passades com a paràmetre (callback/retrocrida/retrollamada -
    document.querySelector("#cameraOn").addEventListener("click", cameraOn);
    document.querySelector("#cameraOff").addEventListener("click", cameraOff);
    document.querySelector("#webCamPause").addEventListener("click", pauseStream);
    document.querySelector("#webCamPlay").addEventListener("click", playStream);
    document.querySelector("#filterButton").addEventListener("click", filter);
    // Lligar elements <--> events amb funcions amb nom (amb paràmetres) - passades com a paràmetre (callback/retrocrida/retrollamada, 
    //fem servir bind com a "truc": https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind
    document.querySelector("#mirrorButton").addEventListener("click", verticalSwap.bind(null,"#videoElement","#canvas"));
    //document.querySelector("#videoElement").addEventListener('playing', getVideoSize, false);   

    // Lligar elements <--> events amb funcions anònimes - No haruíem de ferles servir en events.js, però ho deixem a mode d'exemple.
    document.querySelector("#snapshotButton").addEventListener('click', function(ev){
        if(ev.shiftKey==true){ 
            
            takepicture(true);
        
        }else{
            takepicture(false);
        }
        /* https://www.w3schools.com/jsref/event_preventdefault.asp
           The preventDefault() method cancels the event if it is cancelable, 
           meaning that the default action that belongs to the event will not occur.
        */
        ev.preventDefault();
    }); 
    // I si volem desconnectar un event?
    // https://www.w3schools.com/jsref/met_element_removeeventlistener.asp
}   
