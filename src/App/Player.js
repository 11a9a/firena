import { GAME_WIDTH, GAME_HEIGHT} from './Constants';

export class Player {
	lastFireAt = Date.now();

	angle = 0;
	health = 100
	score = 0;
	ammo = 0;
	dead = false; 

	constructor(positionX, positionY) {
		this.positionX = positionX;
		this.positionY = positionY;
	}

	update = (fireCb) => {
		if(this.health <= 0){
			this.dead = true;
		}

		this.angle = (this.angle + 0.07) % 360;

		if(window.meter && window.meter.volume * 100 > 15){
			if(Date.now() - this.lastFireAt > 200){
				fireCb(this.angle, GAME_WIDTH / 2, GAME_HEIGHT / 2);
				this.lastFireAt = Date.now();
			}
		}
	}
	deductHealth = () => {
		this.health -= 10;
	}

	increaseScore = () => {
		this.score += 10;
	}

	draw = (ctx) => {
		ctx.beginPath();
	    ctx.arc(this.positionX, this.positionY, 30, 0, 2 * Math.PI);
	    ctx.fillStyle = 'cornflowerblue';
	    ctx.fill();
	    ctx.lineWidth = 0.3;
	    ctx.stroke();

	    ctx.font = '24px algerian';
	    ctx.fillStyle = 'black';
	    ctx.fillText(this.health, 10, 50)

		ctx.font = '16px arial';
	    ctx.fillStyle = 'black';
	    ctx.fillText(`Ammo: ${this.ammo}`, 100, 50);

	    ctx.font = '16px arial';
	    ctx.fillStyle = 'black';
	    ctx.fillText(`Score: ${this.score}`, 100, 50);

	    if(window.meter){
	    	ctx.font = '16px arial';
	    	ctx.fillStyle = 'black';
	    	ctx.fillText(`Volume: ${(window.meter.volume * 100).toFixed(1)}`, 100, 50);
	    }

	    ctx.lineWidth = 1;
	    const edgeX = Math.cos(this.angle) * 60;
	    const edgeY = Math.sin(this.angle) * 60;

	    ctx.beginPath();
	    drawArrow(ctx, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH / 2 + edgeX, GAME_HEIGHT / 2 + edgeY);
	    ctx.stroke();
	}
}

function drawArrow(context, fromx, fromy, tox, toy){
	const headlen = 10;
	const dx = tox - fromx;
	const dy = toy -fromy;
	const angle = Math.atan2(dy, dx);
	context.moveTo(fromx, fromy);
	context.lineTo(tox, toy);
	context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy -headlen * Math.sin(angle - Math.PI / 6));
	context.moveTo(tox, toy);
	context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy -headlen * Math.sin(angle + Math.PI / 6));
}