function startGame() 
{
    myGameArea.start();

        var newElement=[];
		 newElement.push(generate());
          newElement.push(generate());
           newElement.push(generate());
            newElement.push(generate());
 

   for (var i =0; i < 10; i++) {
		display(newElement, updateGameArea);
   }
	
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
    },
    /* Paramètres d'effacement du canvas lors de la mise à jour */
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.context.fillStyle = 'rgba(255,255,255,0.6)';
        // this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    },
    /* Définit l'action lors de collisions entre 2 components */
    collision : function() {
        // var dx = redGamePiece.x - greenGamePiece.x;
        // var dy = redGamePiece.y - greenGamePiece.y;

        // var dxc1 = redGamePiece.x - caillou1.x;
        // var dyc1 = redGamePiece.y - caillou1.y;

        // var dxc1_1 = greenGamePiece.x - caillou1.x;
        // var dyc1_1 = greenGamePiece.y - caillou1.y;

        // var distance = Math.sqrt(dx * dx + dy * dy);
        // var dist = Math.sqrt(dxc1 * dxc1 + dyc1 * dyc1);
        // var dista = Math.sqrt(dxc1_1 * dxc1_1 + dyc1_1 * dyc1_1);

        // if (distance < redGamePiece.radius + greenGamePiece.radius) {
        //     greenGamePiece.life -= 5;
        // }
        // if (dist < redGamePiece.radius + caillou1.radius) {
        //     redGamePiece.vy = -redGamePiece.vy;
        //     redGamePiece.vx = -redGamePiece.vx;
        // }
        // if (dista < greenGamePiece.radius + caillou1.radius) {
        //     greenGamePiece.vy = -greenGamePiece.vy;
        //     greenGamePiece.vx = -greenGamePiece.vx;
        // }
        
    }
}

/* Choisir 1 nombres aléatoirement */
function getRandomArbitrary(min, max) {return  Math.floor(Math.random() * (max - min) + min);}
/* Cette fonction retourne un tableau de nouveaux objets */
function generate()
{
    var alea = getRandomArbitrary(1,400);
    var vitesse = getRandomArbitrary(-1,5);
    var newCarn = {
                    x : alea,
                    y : alea,
                    vx : vitesse,
                    vy : vitesse,
                    radius : 5,
                    color : "red",
                    life : 5
    };
    return newCarn;
}

function display(newElement, callback)
{
//console.log(newElement);
    for(var i=0; i<newElement.length; i++)
    {

    	if(newElement[i].life > 0)
        {
            ctx = myGameArea.context;
            //ctx.drawImage(plante, 350, 35, 40, 40);
            ctx.beginPath();
            ctx.arc(newElement[i].x, newElement[i].y, newElement[i].radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = newElement[i].color;
            ctx.fill();
        }
    }
    callback(newElement);
}

/* Mise à jour du jeu */
function  move(newElement)
{
    for(var u=0; u<newElement.length; u++)
    {
        if(newElement[u].life > 0)
        {

            ctx = myGameArea.context;
            //ctx.drawImage(plante, 350, 35, 40, 40);
            ctx.beginPath();
            ctx.arc(newElement[u].x, newElement[u].y, newElement[u].radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = newElement[u].color;
            ctx.fill();

        }
    }
}

function updateGameArea(newElement) 
{

    var cpt = 0;

    setInterval(function()
    {

        myGameArea.clear();

        var dir;
       
            do
            {
                cpt++;

                for(var u=0; u<newElement.length; u++)
                {
                    dir = getRandomArbitrary(-1,2);
                    newElement[u].x += dir;
                    if (newElement[u].x + newElement[u].vx > myGameArea.canvas.width || newElement[u].x + newElement[u].vx < 0) 
                    {
                        console.log(myGameArea.canvas.width);
                        newElement[u].x = -newElement[u].vx;
                    }

                }

                for(var u=0; u<newElement.length; u++)
                {
                    dir = getRandomArbitrary(-1,2);
                    newElement[u].y += dir;
                    if (newElement[u].y + newElement[u].vy > myGameArea.canvas.height || newElement[u].y + newElement[u].vy < 0) 
                    {
                        console.log(myGameArea.canvas.height);
                        newElement[u].y = -newElement[u].vy;
                    }
                }

            }
            while (cpt<10);
                
            for(var u=0; u<newElement.length; u++)
                {
                    dir = getRandomArbitrary(-1,2);
                    newElement[u].x += dir;
                    newElement[u].y += dir;
                    if (newElement[u].y + newElement[u].vy > myGameArea.canvas.height || newElement[u].y + newElement[u].vy < 0) 
                    {
                        newElement[u].y = -newElement[u].vy;
                    }

                    if (newElement[u].x + newElement[u].vx > myGameArea.canvas.width || newElement[u].x + newElement[u].vx < 0) 
                    {
                       newElement[u].x = -newElement[u].vx;
                    }
                }
            
            if(cpt==10)
            {
                cpt=0;
            }

      move(newElement);
      
    },200);
}

 




