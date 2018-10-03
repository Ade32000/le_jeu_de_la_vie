var plant = new Image();

		function init(){
			plant.src = 'images/plante.png';
			window.requestAnimationFrame(draw);
		}

		function draw() {
			var ctx = document.getElementById('myCanvas').getContext('2d');

ctx.beginPath(); 
ctx.arc(240, 125, 25, 0, Math.PI * 2); 
ctx.stroke();
			}

init();