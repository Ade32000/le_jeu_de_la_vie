var redGamePiece, greenGamePiece;

        function startGame() {
            redGamePiece = new component(10, 10, 5, 5, 15,"red");
            //yellowGamePiece = new component(20, 40, 2, 3, 20,"yellow");   
            greenGamePiece = new component(3, 120, 5, 5, 15,"green");   
            myGameArea.start();
        }

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
    },
    clear : function() {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if()
            this.context.fillStyle = 'rgba(255,255,255,0.6)';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
    collision : function() {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
    // collision détectée !
}
}
}

function component(x, y, vx, vy, radius, color) {


    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;    
    this.radius = radius;
    this.color = color;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.y + this.vy > myGameArea.canvas.height || this.y + this.vy < 0) {
            console.log("Mais pourtant ça marche!");
            this.vy = -this.vy;
        }
        if (this.x + this.vx > myGameArea.canvas.width || this.x + this.vx < 0) {
            console.log("Bordel!");
            console.log(this.x);
            this.vx = -this.vx;
        }
    }
}

function updateGameArea() {
    console.log("Y'a quelqu'un???");
    myGameArea.clear();
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
}