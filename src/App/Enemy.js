import { GAME_WIDTH, GAME_HEIGHT } from './Constants';
import { getRandomNumber } from './Utils'

const centerX = GAME_WIDTH / 2;
const centerY = GAME_HEIGHT / 2;


export class Enemy {
	speed = 2;

	dead = false;

	positionX;
	positionY;
	


	constructor(positionX, positionY) {
		this.positionX = positionX;
		this.positionY = positionY;
		this.radius = getRandomNumber(10, 20);
	}

	isDead = () => {
		const relativeX = this.positionX - centerX;
		const relativeY = this.positionY - centerY;

		if(relativeX < 20 && relativeY < 20){
			return true;
		}
	}

	update = (player, bullets) => {
		if(this.dead) return;

		const relativeX = this.positionX - centerX;
		const relativeY = this.positionY - centerY;

		// manual calculation
		const hip = Math.sqrt(Math.pow(relativeX, 2) + Math.pow(relativeY, 2));
		const sin = relativeX / hip;
		const cos = relativeY / hip;

		this.positionX -= sin * this.speed;
		this.positionY -= cos * this.speed;
		// calculate by using math functions
		// const radian = Math.atan2(relativeY, relativeX);
		// this.positionX -= Math.cos(radian) * this.speed;
		// this.positionY -= Math.sin(radian) * this.speed;

		if(!this.dead && this.isDead()){
			this.dead = true;
			player.deductHealth();
		}

		if(!this.dead){
			bullets.forEach(bullet => {
				if(Math.abs(bullet.positionX - this.positionX) < this.radius && Math.abs(bullet.positionY - this.positionY) < this.radius){
					this.dead = true;
					bullet.dead = true;
					player.increaseScore();
				}
			})
		}

	}
	draw = (ctx) => {
		ctx.beginPath();
	    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
	    ctx.fillStyle = 'red';
	    ctx.fill();
	    ctx.lineWidth = 0.3;
	    ctx.stroke();
	}
}