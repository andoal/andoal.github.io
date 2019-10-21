WEBAPP: RetroWebApp
AUTOR:  Antonio Domingo - https://twitter.com/antonioeduca - https://twitter.com/indocents
FECHA:  Octubre 2019

MOTIVO:
    Esta aplicación está pensada para apoyar el apredinzaje en los módulos:
            - M06: Desarrollo de Aplicaciones Web en Entorno Cliente
            - M09: Diseño de Interfícies Web
            - M13: Proyecto (ABP)
    
    Su objetivo es hacer las veces de "sandbox" y tener un propósito de demostración y campo de pruebas. 
    Esta webApp contiene soluciones mejorables, soluciones alternativas a problemas similares y soluciones 
    erróneas para permitir y generar reflexiones en el aula, por lo tanto todas se tienen que leer con mirada 
    crítica y con voluntad de aprendizaje, no como solución final o como verdad verdadera.

    Recordad que en el momento de aprendizaje puede primar la pedagogía y el aprendizaje sobre la productividad. 

PROBLEMA QUE PRETENDE SOLUCIONAR:
    Cada vez se usa más pensamiento visible en el aula, se pretende disponer de una herramienta
    que facilite la proyección de material analógico generado en el aula de manera ágil 
    y facilitando el registro de evidencias. 

LÍNEAS DE ESTILO:
    - Interfaz clara, centrándose en dar una solución que resuelva el problema de manera
    intuitiva a todo tipo de usarios.
    - Inspirarse en un dispositivo hardware (no siempre es buena idea), pocos botones, IU simple y práctica.
    El sistema se usa en entornos donde no se puede perder tiempo en hacer interacicones y muchas veces por
    usuarios que interactuan por primera y quizás única vez (talleres, conferencias...)
    - No usar JQuery
    - Usar JScript nativo (w3schools.com)
    - Usar Material Design Lite para la Interfaz
    - Pensar en una solución que se pueda portar a dispositivos móviles.
    - Programar en JS tiene algo de programación semántica, explicamos para que el navegador interprete y actue.
    - Intentemos que nuestra programación parezca una "explicación" al navegador sobre como se ligan elementos entre sí,
    como saltan eventos para dar respuesta a acciones del usuario y resolver problemas, como se guarda la información 
    junto a los elementos más adecuados, como se pide información remota, o como se espera que se ejecute un petición 
    con la promesa de darle respuesta,  como es la estructura, como queremos que se vea, como queremos que se anime... 
    Sí, hay mucho que diseñar y explicar para que nuestro intérprete (el pobre navegador webn) nos entienda y actue 
    como esperamos de él.
    

ENLACES DE INTERÉS:
    WebCam:
        - https://www.html5rocks.com/es/tutorials/getusermedia/intro/
        - https://webrtc.github.io/samples/src/content/getusermedia/resolution/
        - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        - https://developer.mozilla.org/es/docs/WebRTC/Taking_webcam_photos     
    Promesas:    
        - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Usar_promesas
    Animacions con JS:    
        - https://stackoverflow.com/questions/4358892/how-to-activate-a-css3-webkit-animation-using-javascript
    Canvas:    
        - https://developer.mozilla.org/es/docs/Web/API/HTMLCanvasElement/toDataURL 
    Material design lite:    
        - https://getmdl.io/
        - https://material.io/resources/icons/?style=baseline
    Progressive App:
        - https://developers.google.com/web/progressive-web-apps
        - https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0
        - https://developers.google.com/web/fundamentals/web-app-manifest/?hl=es

ESTRUCTURA DE CARPETAS:

    [ ] RetroWebApp             // Carpeta contenedora de la webApp        
        +-- readme.txt              // Presentación de la aplicación web
        +-- index.html              // Página principal com DOM, layout y componentes de la webApp
        [ ] js                      // Carpeta de funcionalidades
            +-- config.js               // Configuración de la webApp
            +-- events.js               // Eventos de la webApp
            +-- tools.js                // Archivo de herramientas aprovechables en otras WebApp's
            +-- retrowebcam.js          // Funcionalidades de la webApp
        [ ] lang                    // Carpeta con recursos multiidioma
            +-- CAT.js                  // Literales en catalán 
            +-- ENG.js                  // Literales en inglés
            +-- ESP.js                  // Literales en castellano
        [ ] media                   // Carpeta con recursos multimeda
            [ ] users                   // Carpeta con recursos multimedia generados por los usuarios
            [ ] webApp                  // Carpeta con recursos multimedia propios de la webApp
                +-- retroWebCam.png         // Imagen de fondo de la webApp
        [ ] style                   // Carpeta con la apariencia de la webApp
            +-- retrowebcam.css         // Hoja de estilo de la webApp
        [ ] terceros                // Plugins, librerías, archivos, recursos... de 3os a los que no damos entrada en otras 
                                    //carpetas o no queremos dar de alta en la estructura principal.
        [ ] UI                      // Carpeta con recursos relacionados con la Interfaz de Usurio (Bootstrap, material desing...)
            @-- material desing lite    // Recurso de 3os: Material Design Lite: https://getmdl.io/ 
        
ESTRUCTURA DE COMPONENTES:

    +-1)WebApp----------------------------------------------------------------------------------+
    |                                                                                           |
    |   +-2)RetroWebCam (retroWebCam)------------------------------+   +-3)Menu accionns----+   |
    |   |                                                          |   |                    |   |
    |   |  - 2.1a WebCam (VideoElement) // Visible alternat. a<->b |   | 3.1 Camera On/off  |   |
    |   |  - 2.1b StillImage (canvas)   // Visible alternat. a<->b |   |                    |   |
    |   |  - 2.2  Download (downloadCanvas) // Oculto              |   |--------------------|   |
    |   |                                                          |   |                    |   |
    |   |    ".fx0---5"      // Filtres visuals                    |   | 3.2 ActionButtons  |   | 
    |   |    ".filterApply"  // Elements als que aplicar filtres   |   |  Los ".menuCamera" |   | 
    |   |                                                          |   |  reaccionan a 3.1  |   | 
    |   |                                                          |   |                    |   |
    |   |                                                          |   |                    |   |
    |   |                                                          |   |                    |   |
    |   |                                                          |   |                    |   |
    |   |                                                          |   |                    |   |
    |   |                                                          |   |                    |   |
    |   +----------------------------------------------------------+   +--------------------+   |
    +-------------------------------------------------------------------------------------------+
        
    Estados de la aplicación: 
        off: 1 -  on: 2 - canvas: 3
        1) Webcam off (ActionButtons disabled)  <--> 2) Webcam on (ActionButtons enabled) <---+
                 /\--------------------------------- 3) Canvas on <---------------------------+
    
    Estados de WebCam/StillImage  
        rotate: 0º/180º almacenado en una estructura data-??? en elementos del DOM (retroWebCam)

ALGUNAS COSAS QUE VER:
    [ ] Separación DOM, Estilo, Funcionalidad
    [ ] Estructura de carpetas de una WebApp 
    [ ] Aproximación al concepto de componentes web
    [ ] Acceso a elementos con QuerySelectors
    [ ] Trabajo con información
        [ ] Data-???
        [ ] Scope global / local y formas de trabajo con ellos
        [ ] Información local
    [ ] Acceso a dispositivos del cliente
    [ ] Reacción a eventos
    [ ] Ligar diferentes elementos separados visualmente entre sí, 
        pero unidos funcionalmente y agrupados por etiquetas. Semánticamente.
    [ ] Reacción entre componentes
    [ ] Diferentes soluciones para mismos problemas (difernetes sintáxis de eventos, 
        funciones diseñadas ad hoc vs con voluntad de ser más genéricas, reutilizables, independientes, formas de
        declarar variables globales, de almacenar información, de ligar elementos semánticamente...)
    [ ] Otros
    
 
    