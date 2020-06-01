import { GAME_WIDTH, GAME_HEIGHT } from './Constants';

export class Bullet {
	dead = false;

	angle;
	positionX;
	positionY;

	speed = 10;

	constructor(angle, positionX, positionY) {
		this.angle = angle;
		this.positionX = positionX;
		this.positionY = positionY;
	}

	update = () => {
		const x = Math.cos(this.angle) * this.speed;
		const y = Math.sin(this.angle) * this.speed;
		this.positionX += x;
		this.positionY += y;

		if(this.positionX < 0 || this.positionX > GAME_WIDTH || this.positionY < 0 || this.positionY > GAME_HEIGHT){
			this.dead = true;
		}
	}

	draw = (ctx) => {
		ctx.beginPath();
		ctx.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.lineWidth = 0.3;
		ctx.stroke();
	}
}