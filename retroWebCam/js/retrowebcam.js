/* ARXIU DE FUNCIONALITATS DE LA WEB APP:
    En aquest arxiu posarem les funcionalitats principals de la webApp, en el cas
    que ens ocupa a més a més posarem els "equivalents a webComponent" en aquest arxiu, separant per comentaris.
    En el futur hauríem de separar el "WebComponents" en arxius .js/.css, un per component.
*/     

// ENTRADA: 
// FUNCIÓ: Voltejar verticalment (rotant 180º) els visors d'imatge
// SORTIDA: 
function init(){
    // Lligar els elements del DOM als events
    loadInitialEvents();
    // 
    // Variables d'àmbit global (global scope). En no tenir var davant esdevenen globals, 
    //per claretat i com a bona pràctica ho fem explícit i les declarem a config.js
    streaming   = false; // Inicialment no hi ha font de vídeo activa.
    video       = document.querySelector('#videoElement'); // Apuntador a l'ement vídeo
    canvas      = document.querySelector('#canvas'); // Aountado a l'ement canvas
    webCamState = webCamStates.off; // Inicialment la webcam està apagada.     
}


// ENTRADA: Elements visuals a rotar
// FUNCIÓ:  Voltejar verticalment (rotant 180º) els visors d'imatge
// SORTIDA: Elements rotats
function verticalSwap(videoElement, canvasElement, e)
{
    // Podríem fer servir la variable global, o fer com en aquest cas i fer la funció més independent esperant els pas
    //dels elements per paràmetre.
    
    // Apuntador a la webCam
    var webcam = document.querySelector(videoElement); 
    // Rotar 180º --> 0º, aplicant animació definida al .CSS
    if(webcam.dataset.rotate == "180"){
        webcam.style.animationName="swapUp";
        webcam.style.animationDuration = '1s';
        webcam.style.transform="rotate(0deg)";
        webcam.dataset.rotate  = "0";
    }
    // Rotar 0º --> 180º, aplicant animació definida al .CSS
    else{
        webcam.style.animationName="swapDown";
        webcam.style.animationDuration = '1s';
        webcam.style.transform="rotate(180deg)";
        webcam.dataset.rotate  = "180";
    
    }
    // Si ens han proporcionat una apuntador al canvas (imatge estàtica)...
    if (canvasElement != undefined){
        // Apuntador a l'element imatge estàtica del DOM
        var canvas = document.querySelector(canvasElement); 
        // Rotar 180º --> 0º, aplicant animació definida al .CSS
        if(canvas.dataset.rotate == "180"){
            canvas.style.animationName="swapUp";
            canvas.style.animationDuration = '1s';
            canvas.style.transform="rotate(0deg)";
            canvas.dataset.rotate  = "0";
        }
        // Rotar 0º --> 180º, aplicant animació definida al .CSS
        else{
            canvas.style.animationName="swapDown";
            canvas.style.animationDuration = '1s';
            canvas.style.transform="rotate(180deg)";
            canvas.dataset.rotate  = "180";
        
        }  
    }         
    
    // Les animacions duren un segon, ens cal desactivar-les per que no s'activin
    // en altres moments (quan ocultem/mostrem els elements de webcam i imatge estàtica).
    // Fem servir la solució del SetTimeOut per esperar més d'un segon i desactivar per raons de demostració de 
    // funcions assíncrones bàsiques però... hi ha alguna manera més elegant de fer això? 
    // Podem detectar quan ha acabat l'animació i llavors desactivar-la?
    setTimeout(function(){ 
                    document.querySelector(videoElement).style.animationName="";
                    document.querySelector(canvasElement).style.animationName="";
                }, 1200);
        
}

// ENTRADA: 
// FUNCIÓ:  Encendre la webCam.
// SORTIDA: Font de video activa i visible per l'usuari
function cameraOn(){
    // https://www.html5rocks.com/es/tutorials/getusermedia/intro/
    // https://webrtc.github.io/samples/src/content/getusermedia/resolution/
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    
    // Activar la font de vídeo
    // Em promets que intentaràs connectar a la web cam? https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Usar_promesas
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          // Si aconseguim connexió...
          .then(function (stream) {
            video.srcObject = stream; // Guardar la font de dades
            // Actualitzar estat dels botons
            document.querySelector("#cameraOn").style.display="none"; // Hide element
            document.querySelector("#cameraOff").style.display="inline-block"; // Show element
            // Actualitzar el menú d'accions
            updateMenuWhenWebCamTurnOn(); 
            // Guardar la font de dades activa
            mediaStream = stream.getTracks()[0]; 
            // Actualitzar l'estat de la webApp
            webCamState = webCamStates.on; 
          })
          // Si no aconseguim connexió...
          .catch(function (error) {
            console.log("Something went wrong!"); // Log d'errors
            // Actualitzar estat dels botons
            document.querySelector("#cameraOff").style.display="none";  // Hide element
            document.querySelector("#cameraOn").style.display="inline-block"; // Show element
            // Actualitzar el menú d'accions
            updateMenuWhenWebCamTurnsOff();
            // Actualitzar l'estat de la webApp
            webCamState = webCamStates.off;
          });
      }
      
}

// ENTRADA: 
// FUNCIÓ:  Apagar la webCam i tornar l'aplicació a l'estat inicial
// SORTIDA: Font de video desactivada i oculta per l'usuari
function cameraOff(){
    // Desconnectar font de dades
    video.srcObject = null;
    // Actualitzar estat dels botons
    document.querySelector("#cameraOn").style.display="inline-block";  // Show element
    document.querySelector("#cameraOff").style.display="none";  // Hide element
    
    // Deixar l'aplicació en el seu estat inicial
    playStream();   // Font de vídeo activa: webCam
    updateMenuWhenWebCamTurnsOff(); // Menú d'accions d'usuari desactivat
    webCamState = webCamStates.off; // Estat de la webApp: Webcam off
    mediaStream.stop(); // Aturar la connexió a la WebCam
    
}

// ENTRADA: 
// FUNCIÓ:  Inhabilitar el grup d'elements marcats amb class ".menuCamera"
// SORTIDA: 
function updateMenuWhenWebCamTurnsOff()
{
    //Seleccionar elements dels ".menuCamera" i desactivar-los
    var list=document.querySelectorAll(".menuCamera");
    for (i = 0; i < list.length; i++) {
        list[i].disabled= true;
      }
    

}
// ENTRADA: 
// FUNCIÓ:  Habilitar el grup d'elements marcats amb class ".menuCamera"
// SORTIDA: 
function updateMenuWhenWebCamTurnOn()
{
    //Seleccionar elements dels ".menuCamera" i activar-los
    var list=document.querySelectorAll(".menuCamera");
    for (i = 0; i < list.length; i++) {
        list[i].disabled= false;
    }
}

// ENTRADA: WebCam activa i visible 
// FUNCIÓ:  Simular el botó still dels reproductors multimèdia
// SORTIDA: Imatge estàtica activa i visible, webcam no visible
function pauseStream(e){
    // Alternar visibilitat dels botons play/pause
    document.querySelector("#webCamPause").style.display="none"; // Hide element
    document.querySelector("#webCamPlay").style.display="inline-block"; // Show element
    // Fer foto de l'element vídeo al canvas
    snapshotToCanvas(false);
    // Alternar visibilitat dels elementes webCam <--> canvas
    document.querySelector("#videoElement").style.display="none"; // Hide element
    document.querySelector("#canvas").style.display="inline-block"; // Show element
    // Actualitzar estat de l'aplicació: Imatge estàtica al canvas
    webCamState = webCamStates.canvas;  
}

// ENTRADA: Imatge estàtica activa i visible 
// FUNCIÓ:  Simular el botó still dels reproductors multimèdia
// SORTIDA: WebCam activa i visible, Imatge estàtica no visible
function playStream(e){
    // Alternar visibilitat dels botons play/pause
    document.querySelector("#webCamPause").style.display="inline-block"; // Hide element
    document.querySelector("#webCamPlay").style.display="none"; // Show element
    // Alternar visibilitat dels elementes webCam <--> canvas
    document.querySelector("#videoElement").style.display="inline-block"; // Hide element
    document.querySelector("#canvas").style.display="none"; // Show element
    // Actualitzar estat de l'aplicació: Imatge estàtica al canvas
    webCamState = webCamStates.on;
    
}
// ENTRADA: Tecla de funcionament alternatiu activada o no (ara per ara "shift" però això no funciona al mòbil)
// FUNCIÓ:  Descarregar una fotografía igual que el que està veient l'usuari
// SORTIDA: Imatge .png amb nom automàtic (basada en la data) o si s'activa
//          el funcionament alternatiu es donarà l'opció de personalitzar el nom.
function takepicture(shiftPressed) {
    
    // Si la webcam està activa...
    if(webCamState == webCamStates.canvas){
        // Capturar la imatge activa en un canvas de treball
        canvas2dowloandCanvas();                
        // Si l'imatge està rotada...
        if (canvas.dataset.rotate=="180"){
            // Rotar la imatge
            switchCanvas();            
        }
        // Activar la descàrrega del canvas de trebal
        downloadCanvas(shiftPressed,"downloadCanvas");                           
        
    }
    // Si el canva està actiu...
    else{
        // Capturar la imatge activa i passar-la al canvas d'imatge estàtica
        snapshotToCanvas(true); 
        // Capturar la imatge activa en un canvas de treball  
        canvas2dowloandCanvas();
        // Activar la descàrrega del canvas de trebal
        downloadCanvas(shiftPressed,"downloadCanvas");
    }
}
// ENTRADA: rotate (true = voltejar la imatge / false = no voltejar)
//          canvas: definit a config.js
//          video:  definit a config.js
// FUNCIÓ:  Fer una còpia de la font de vídeo al canvas d'imatge estàtica
// SORTIDA: 
function snapshotToCanvas(rotate){

    // Copiar la font de vídeo al canvas
    // Replicar mides d'imatge (alt i ample)
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Apuntador al context de treball del canvas
    var canvasContext= canvas.getContext("2d");
    // Fer una còpia del div amb el vídeo al div amb el canvas
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Exemple per copiar la captura en un element imatge <img>:
    //var data = canvas.toDataURL('image/png');
    // img.setAttribute('src', data);    

    // Creeem un canvas auxiliar per "editar"
    var auxCanvas = document.createElement('canvas');
    auxContext = auxCanvas.getContext("2d");
    auxCanvas.width = canvas.width;
    auxCanvas.height = canvas.height;
    // Copiem la imatge estàtica que veu l'usuari al canvas auxiliar
    auxContext.drawImage(canvas,0,0,canvas.width,canvas.height);
    
    // Afegim el canvas per poder debuggar, va tan ràpid que no es veu, en condicions normals ho hauriem d'evitar
     document.body.appendChild(auxCanvas);
 
    // Si la el canvas amb la imatge de la webCam està rotat... rotem també el canvas
    // Anem a preparar el canvas de destí abans de copiar la imatge (de la mateixa manera podríem afegir marques d'aigua, efectes extra...)
    if(rotate){
        if(video.dataset.rotate == "180"){            
            auxContext.save();
                // Quan apliquem la rotació es fará sobre el vèrtex superior esquerre del canvas, 
                // volem que el canvas roti sobre el seu centre, per tant:
                // Traslladar el vèrtex superior esquerra del canvas fins al centre de l'element.        
                auxContext.translate(canvas.width/2, canvas.height/2);          
                // Fer la rotació sobre el seu eix (fem transformació de graus a radians,
                // grad2rad() podría ser una funció per implementar a tools.js? Existeix ja entre les funcions que ofereix JS?
                auxContext.rotate(180*Math.PI/180);
                // Traslladar el vèrtex superior esquerra del canvas a la seva posició original.
                auxContext.translate(-canvas.width/2, -canvas.height/2);
                // Copiar la imatge del canvas apuntat en la variable global al canvas auxiliar creat
                // Aquesta funció treballa sobre la varibable global canvas que apunta al canvas HTML, 
                // valdria la pena convertir-la en una funció més genèrica/independent dels elements HTML?
                // Com ho podríem fer? i si la funció fer servir paràmetres d'entrada?
                // canvas de la variable global (canvas d'imatge estàtica) --> auxCanvas (canvas de descàrregues, downloadCanvas)           
                auxContext.drawImage(canvas,0,0,canvas.width,canvas.height);
            auxContext.restore();
        }     
    }
       
    // Dibuixar al canvas on es mostren les imatges estàtiques a l'usuri el contingut del canvas auxiliar editat.
    canvasContext.drawImage(auxCanvas,0,0,canvas.width,canvas.height);

    // El canvas auxiliar ja no ens fa falta, l'esborrem del DOM per alliberar recursos i assegurar-nos
    // que no generem canvas auxiliars duplicats en cada crida a aquesta funció
    auxCanvas.remove();       

}

// ENTRADA: canvas (com variable global que apunta al canvas amb la imatge estàtica que es mostra a l'usuari) 
// FUNCIÓ:  Fer una còpia voltejada 180º del canvas amb la imatge estàtica al canvas on preparem les imatges per les descàrregues.
// SORTIDA: "#downloadCanvas" (canvas on preparem les descàrregues) amb el contingut del canvas voltejat 
function switchCanvas(){  
    // Apuntador a l'element canvas amb la imatge estàtica
    var auxCanvas = document.querySelector("#downloadCanvas"); // Aquesta funció treballa únicament sobre un DIV concret, valdria la pena convertir-la en una funció més genèrica/independent dels elements HTML?
    var auxContext = auxCanvas.getContext("2d"); // Apuntador al context de trevall de l'element
    // Anem a preparar el canvas de destí abans de copiar la imatge (de la mateixa manera podríem afegir marques d'aigua, efectes extra...)
    auxContext.save();
        // Quan apliquem la rotació es fará sobre el vèrtex superior esquerre del canvas, 
        // volem que el canvas roti sobre el seu centre, per tant:
        // Traslladar el vèrtex superior esquerra del canvas fins al centre de l'element.
        auxContext.translate(canvas.width/2, canvas.height/2);          
        // Fer la rotació sobre el seu eix (fem transformació de graus a radians,
        // grad2rad() podría ser una funció per implementar a tools.js? Existeix ja entre les funcions que ofereix JS?
        auxContext.rotate(180*Math.PI/180);
        // Traslladar el vèrtex superior esquerra del canvas a la seva posició original.
        auxContext.translate(-canvas.width/2, -canvas.height/2);
        // Copiar la imatge del canvas apuntat en la variable global al canvas auxiliar creat
        // Aquesta funció treballa sobre la varibable global canvas que apunta al canvas HTML, 
        // valdria la pena convertir-la en una funció més genèrica/independent dels elements HTML?
        // Com ho podríem fer? i si la funció fer servir paràmetres d'entrada?
        // canvas de la variable global (canvas d'imatge estàtica) --> auxCanvas (canvas de descàrregues, downloadCanvas)   
        auxContext.drawImage(canvas,0,0,canvas.width,canvas.height);
    auxContext.restore();
}

// ENTRADA: canvas (com variable global que apunta al canvas amb la imatge estàtica que es mostra a l'usuari) 
// FUNCIÓ:  Fer una còpia del canvas amb la imatge estàtica cap al canvas on preparem les imatges per les descàrregues.
// SORTIDA: "#downloadCanvas" (canvas on preparem les descàrregues) amb el contingut del canvas original 
function canvas2dowloandCanvas(){
    // Apuntador a l'element canvas amb la imatge estàtica
    // /!\ ATENCIÓ: canvasContext està declarat sense var... no està declarat a config.js... pots debuggar/investigar l'àmbit\scope d'aquesta variable? És local? ÉS global? Altres?
    canvasContext = document.querySelector("#canvas").getContext("2d"); // Aquesta funció treballa únicament sobre un DIV concret, valdria la pena convertir-la en una funció més genèrica/independent dels elements HTML?    
    // /!\ ATENCIÓ: auxCanvas està declarat sense var... no està declarat a config.js... pots debuggar/investigar l'àmbit\scope d'aquesta variable? És local? ÉS global? Altres?
    var auxCanvas = document.querySelector("#downloadCanvas"); // Apuntador al context de trevall de l'element
    auxContext = auxCanvas.getContext("2d"); // Apuntador al context de trevall de l'element
    // Fem que els dos llençols (canvas) tinguin les mateixes mides    
    auxCanvas.width = canvas.width;
    auxCanvas.height = canvas.height;
    // Recollim els estils aplicats al canvas d'origen
    var cssFilter = getComputedStyle(document.querySelector("#canvas")).filter;
    // Aplicar el filtre al canvas destí (a partir d'ara totes les operacions de dibuix sobre el canvas tindran aquest estil aplicat)
    auxContext.filter = cssFilter;
    // Copiar al canvas de descàrregues la imatge del canvas visible per l'usuari
    auxContext.drawImage(canvas,0,0,canvas.width,canvas.height);
}

// ENTRADA: askName:    TRUE    --> pregunta per nom d'arxiu / FALSE: farà un nom automàtic amb un timeStamp.
//          elementId:  FALSE   --> Id de l'element que volem descarregar (ho fem amb un element de tipus canvas, funcionaria amb altres tipus?)
// FUNCIÓ:  Descarregar com a imatge el contingut de l'element indicat
// SORTIDA: Imatge descarregada
function downloadCanvas(askName, elementId){
    // Crear un element <a> fantasma (no l'afegirem al DOM)
    var link = document.createElement('a');
    // Crear el nom d'arxiu automàtic (serà un timestamp)
    var d = new Date();
    var fileName = String(d.getFullYear())+String(d.getMonth()+1)+String(d.getDate())+String(d.getHours())+String(d.getMinutes())+String(d.getSeconds()); 
    link.download = fileName;
    
    // Si s'ha de demanar nom...
    if(askName){
        // Recollir nom de l'usuari (fem servir la finestra prompt que ens proporcionar JS, 
        // podríem fer un formulari propi? o cridar al formulari de baixar arxius del navegador?)
        var userFileName=prompt(messages.pedirNombreArchivo, fileName);
        if(userFileName!=null){
            // Afegir el nom d'usuari a l'element <a>
            link.download = userFileName;     
        } 
    
    }
    // Convertir canvas a imatge en el format indicat
    link.type = "png"; 
    link.href = document.getElementById(elementId).toDataURL();        
    // Simular un click sobre l'element <a>
    link.click();            
    // Eliminar l'element <a> fantasma
    link.remove();   
   }
   

// ENTRADA: e:  informació que ens proporciona el sistema sobre l'element sobre el que s'ha produït l'event que ha disparat la crida a la funció
//           ".filterApply": Els elements amb aquest class seràn els que rebran un filtre            
// FUNCIÓ:  Aplicar el següent filtre de la llista de filtres configurada al full d'estils de la webApp
// SORTIDA: filtre activat.
//          "fx?": Els elements amb aquest class tenen un filtre actiu, la definició del qual està al full d'estil
function filter(e) {
    // var el = e.target;

    // Aplicarem el filtre sobre tots els elements marcats amb la class ".filterApply"
    // (i) Aquesta forma d'etiquetar elements ens permet agrupar-los estàtica o 
    // dinàmicament marcant-los al HTML i així poder tractar-los en grup 
    var list=document.querySelectorAll(".filterApply");
    // Preparo una variable per enmagatzemar el filtre que desactivarem
    var oldFilter=0;
    // Si el filtre actiu és l'últim de la llista de filtres preparats al full d'estils...
    if(activeFilter==maxFilter){// maxFilter està definit a config.js
        activeFilter=0;         // El filtre actiu serà el primer de la llista
        oldFilter=maxFilter;    // Guardar el filtre que deixarà d'estar actiu
    }
    else{
        oldFilter=activeFilter; // Guardar el filtre que deixarà d'estar actiu
        activeFilter++;         // El filtre actiu serà el següent de la llista
        
    }
    // Recórrer la llista d'elements marcats amb ".filterApply" i actualitzar el filtre marcant amb l'estil 
    for (i = 0; i < list.length; i++) {
        list[i].classList.remove("fx"+oldFilter);
        list[i].classList.add("fx"+(activeFilter));
    } 
}
    
      
        