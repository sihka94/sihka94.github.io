var canvas = document.querySelector('#ctx'),
		ctx = canvas.getContext('2d'),
		game,
		reload = document.querySelector('.start'),

		bird = new Image(),
		bg = new Image(),
		fg = new Image(),
		pipeUp = new Image(),
		pipeDown = new Image(),

		fly = new Audio(),
		score_audio = new Audio();

		fly.src = "audio/fly.mp3";
		score_audio.src = "audio/score.mp3";

		bird.src = 'images/bird.png';
		bg.src = 'images/bg.png';
		fg.src = 'images/fg.png';
		pipeUp.src = 'images/up.png';
		pipeDown.src = 'images/down.png';
		// score 
		let score = 0;
		const gap = 90;
		let xPos = 10,
				yPos = 150,
				gravity = 1.5,
				pipe = [];

			pipe[0] = {
				x : canvas.width,
				y : 0,
			}
document.addEventListener('keydown', moveUp);
function  startGame() {
	reload.addEventListener('click', function(){
	reload.classList.remove('is-hide');
		score = 0;
		xPos = 10;
		yPos = 150;
		gravity = 1.5;
		pipe = [];
		pipe[0] = {
			x : canvas.width,
			y : 0,
		}
		if (!game) {
			Draw();
		}
	})
// pipeDown.onload = Draw;
}
function  moveUp() {
	var start = Date.now(); 
	var timer = setInterval(function() {
  var timePassed = Date.now() - start;
  if (timePassed >= 120) {
    clearInterval(timer); 
    return;
  }
  anim(timePassed);
}, 20);
	fly.pause();
	fly.currentTime = 0;
	fly.play();
}
function anim(timePassed) {
  yPos -= 5;
}

function Draw() {
	game = true;
	reload.classList.add('is-hide');
	ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
	for(let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		pipe[i].x --;
		if (pipe[i].x == 125) {
			pipe.push({
				x : canvas.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}
		if (xPos + bird.width >= pipe[i].x
			 && xPos <= pipe[i].x + pipeUp.width
			 && (yPos <= pipe[i].y + pipeUp.height
			 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
			 || yPos + bird.height >= canvas.height - fg.height) {
			 game = false;
		}
		if (pipe[i].x == 5) {
			score_audio.play();
			score++;
		}
	}
	if(game) {
		startGame();
		ctx.drawImage(fg, 0, canvas.height - fg.height);
		ctx.drawImage(bird, xPos, yPos);
		yPos += gravity;
		ctx.fillStyle = "#000";
		ctx.font = "20px Verdana";
		ctx.fillText("Счёт :" + score, 10, canvas.height - 20);
		requestAnimationFrame(Draw);
	}
	else {
	  ctx.drawImage(fg, 0, canvas.height - fg.height);
	  ctx.fillText("Счёт :" + score, 10, canvas.height - 20);
	  reload.classList.remove('is-hide');
	}
}
console.log(canvas.width)
console.log(canvas.height)