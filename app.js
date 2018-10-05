/* Définition des variables */


var redGamePiece, greenGamePiece, caillou1;
var plante = new Image();
plante.src = 'images/plante.png'; // Image


/* Cette fonction retourne un tableau de 4 nombres choisis aléatoirement*/

function getRandomArbitrary(min, max) {

    var result = [];
    for(var i=0; i<5; i++)
    {
        var calcul = Math.floor(Math.random() * (max - min) + min);
        result.push(calcul);
    }
    return  result;
}



/* Cette fonction retourne un taableau de nouveaux objets */
function generate()
{

    var carnivore = [];
    var k=0;
    var alea;
    var vitesse;
    

    while (k<11)
    {
    alea = getRandomArbitrary(1,800);
    vitesse = getRandomArbitrary(1,5);

           
        for(var j=0; j<1; j++)
        {
                var newCarn = {
                x : alea[0],
                y : alea[1],
                vx : vitesse[0],
                vy : vitesse[1],
                radius : 15,
                color : "red",
                life : 5};

            carnivore.push(newCarn);
            console.log(newCarn);
        }
        k++;
    }
     return carnivore;
}



function startGame() 
{
  
    redGamePiece = new component(2, -10, 5, 5, 15,"red", 5);
    caillou1 = new component(220, 140, 0, 0, 20,"grey", 5);     
    greenGamePiece = new component(300, 120, 5, 5, 15,"green",5); 

    myGameArea.start();
}


/* Tous les paramètres de la zone de jeu */


var myGameArea = 
{
    /* On génère dynamiquement le canvas */
    canvas : document.createElement("canvas"),



    /* Paramètres du canvas + actions lors du rafraichissement via setInterval */
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 5);
    },

    /* Paramètres d'effacement du canvas lors de la mise à jour */
    clear : function() {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'rgba(255,255,255,0.6)';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    },

    /* Définit l'action lors de collisions entre 2 components */
    collision : function() {
        
        var dx = redGamePiece.x - greenGamePiece.x;
        var dy = redGamePiece.y - greenGamePiece.y;

        var dxc1 = redGamePiece.x - caillou1.x;
        var dyc1 = redGamePiece.y - caillou1.y;

        var dxc1_1 = greenGamePiece.x - caillou1.x;
        var dyc1_1 = greenGamePiece.y - caillou1.y;

        var distance = Math.sqrt(dx * dx + dy * dy);
        var dist = Math.sqrt(dxc1 * dxc1 + dyc1 * dyc1);
        var dista = Math.sqrt(dxc1_1 * dxc1_1 + dyc1_1 * dyc1_1);

        if (distance < redGamePiece.radius + greenGamePiece.radius) {
            greenGamePiece.life -= 5;
        }
        if (dist < redGamePiece.radius + caillou1.radius) {
            redGamePiece.vy = -redGamePiece.vy;
            redGamePiece.vx = -redGamePiece.vx;
        }
        if (dista < greenGamePiece.radius + caillou1.radius) {
            greenGamePiece.vy = -greenGamePiece.vy;
            greenGamePiece.vx = -greenGamePiece.vx;
        }
        
    }
}


/* Classe Components */

function component(x,y,vx,vy,radius,color,life) {

    newElement = generate();

    .x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;    
    this.radius = radius;
    this.color = color;
    this.life = life;
    this.update = function(){

        if(this.life > 0)
        {
            ctx = myGameArea.context;
            ctx.drawImage(plante, 350, 35, 40, 40);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();

            if (this.y + this.vy > myGameArea.canvas.height || this.y + this.vy < 0) 
            {
                this.vy = -this.vy;
            }

            if (this.x + this.vx > myGameArea.canvas.width || this.x + this.vx < 0) 
            {
                this.vx = -this.vx;
            }
            
        }
    }
}


/* Mise à jour du jeu */

function updateGameArea() {
    
    myGameArea.clear();
    myGameArea.collision();
    //redGamePiece.x += 1;
    //redGamePiece.y += 1;
    redGamePiece.x += redGamePiece.vx;
    redGamePiece.y += redGamePiece.vy;


    //greenGamePiece.x += 1;
    //greenGamePiece.y += 1;
    greenGamePiece.x += greenGamePiece.vx;
    greenGamePiece.y += greenGamePiece.vy;

    redGamePiece.update();       
    greenGamePiece.update();
    caillou1.update();
    // caillou2.update();
    // caillou3.update();
    // caillou4.update();
    // caillou5.update();

}

