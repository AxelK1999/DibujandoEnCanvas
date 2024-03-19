window.addEventListener('load',function(){ //evento load -->ejecuta cuando toda los recursos de la pag haya cargado 
    const canvas = document.getElementById('canvas_1');
    const ctx = canvas.getContext('2d');
    canvas.width = this.window.innerWidth;
    canvas.height = this.window.innerHeight;
    //Canvas configuracion

    ctx.fillStyle = 'green';
    let linewidth = Math.floor(Math.random() *20 + 10);
    ctx.lineCap = 'round'; 
    //sombras
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY=5;
    ctx.shadowBlur = 10;

    //Configuracion de efectos:
    let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.2;
    let sides = 4; 
    let maxlevel = 5;
    let angluo = 0.9;  //spread  (en radianes) 
    let scale = 0.6; 
    let ramas = 2; //ramas de ambos lados
    let color = 'hsl(200,100%,50%)';
    
    let ponyX = 0;
    let pointY = size;

    let RamasEnAmbosLados = true;
    //----------------------------------
    /*
    ctx.save();
        //--- las operaciones(rotar,mover,escalar,etc) definidas entre -save y -restore, solo afectan a los elementos que esten diujados entre los mismos
        //--- las operaciones definidas fuera de el tambien afectan a los elementos que este definidos entre -save y -restore  
        ctx.scale(0.5,0.5);// igual que las anterioires pero estira.
        ctx.fillRect(0,0,100,100);
    ctx.restore();
        */



    //------------------------------------

    function drawRama(level){

        if(level > maxlevel) return;

        //Dibuja ------
        ctx.beginPath();//define una ruta de dibujo(unidad)
        //Tabien son configurables para Experimentar
        ctx.moveTo(0,0);//Posiciones en una ubicacion en el plano
        ctx.lineTo(size,0);//define un puunto que se unira con las demas establecidas
        ctx.stroke();//dibuja la ruta.
        //------

        for(let i=0;i < ramas ;i++){
            
            ctx.save();
            ctx.translate(size - (size/ramas) * i,0);// traslada/mueve punto de origen en esas unidades todo lo dibujado en la ruta luego de EL.
            ctx.rotate(angluo);//rota sobre punto de origen todo los elementos dubujados en la ruta que estan a cuntinuacion de EL
            ctx.scale(scale,scale);// igual que las anterioires pero estira.
            drawRama(level + 1);
            ctx.restore();
            
            if(RamasEnAmbosLados){
                ctx.save();
                ctx.translate(size - (size/ramas) * i,0);// traslada/mueve punto de origen en esas unidades todo lo dibujado en la ruta luego de EL.
                ctx.rotate(-angluo);//rota sobre punto de origen todo los elementos dubujados en la ruta que estan a cuntinuacion de EL
                ctx.scale(scale,scale);// igual que las anterioires pero estira.
                drawRama(level + 1);
                ctx.restore();
            }

            //circulos
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(0,size,size*0.1,0,Math.PI*2);
            ctx.fill();
            
            
        
        }

    }
    //drawRama(0);

    function drawFractal(){
        
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.lineWidth = linewidth; // ancho de linea (grosor de línea actual)

        ctx.save();
        ctx.strokeStyle = color;//todas las lineas de dibujan con esta propiedad(por defecto blck)     
        ctx.translate(canvas.width/2,canvas.height/2);// traslada/mueve punto de origen en esas unidades todo lo dibujado en la ruta luego de EL.
        ctx.rotate(80);//rota sobre punto de origen todo los elementos dubujados en la ruta que estan a cuntinuacion de EL
        ctx.scale(1,1);
        for(let i = 0; i<sides;i++){
            ctx.rotate((Math.PI*2)/sides);
            drawRama(0);
        }
        ctx.restore();

    }
    drawFractal();


    //controles

    const sliderAngulo = this.document.getElementById('angulo');
    sliderAngulo.addEventListener('change', function(e){
        console.log(e.target.value);
        angluo = e.target.value;
        drawFractal();

    });
    const sliderSides = this.document.getElementById('sides');
    sliderSides.addEventListener('change', function(e){
        console.log(e.target.value);
        sides = e.target.value;
        drawFractal();

    });
    const cheBoxAmbosLadoRama = this.document.getElementById('RamasAmbosLados');
    cheBoxAmbosLadoRama.addEventListener('change', function(e){
        RamasEnAmbosLados = e.target.checked;
        drawFractal();

    });
    const maxNiveles = this.document.getElementById('maxNiveles');
    maxNiveles.addEventListener('change', function(e){
        console.log(e.target.value);
        maxlevel = e.target.value;
        drawFractal();

    });
    const sliderlinewidth = this.document.getElementById('linewidth');
    sliderlinewidth.addEventListener('change', function(e){
        console.log(e.target.value);
        linewidth = e.target.value;
        drawFractal();

    });

    const btn_renderizar = this.window.document.getElementById('btn-rederizar');
    btn_renderizar.addEventListener('click',renderizarFractal);

    function renderizarFractal(){
        angluo =  Math.random()*2.9 + 0.1;  //spread  (en radianes) 
        scale = Math.random() *0.2 + 0.4; 
        color = 'hsl('+Math.random() * 360 +',100%,50%)';
        sides =Math.floor(Math.random()*7 + 2);
        linewidth = Math.floor(Math.random() *20 + 10);
        btn_renderizar.style.backgroundColor = color;
        drawFractal();
    }
    
    

});