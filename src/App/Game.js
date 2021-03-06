import React, { useEffect } from 'react';
import { SCREEN, GAME_HEIGHT, GAME_WIDTH } from './Constants';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { getRandomNumber } from './Utils';
import { Bullet } from './Bullet';

const MAX_ENEMY_COUNT = 10;

function Game({setScore, setScreen, userName}) {
  let canvas;
  let ctx;
  let player;
  let lastEnemySpawnAt = Date.now();

  useEffect(() => {
    player = new Player(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    let enemies = [];
    let bullets = [];
    const fireBulletCb = (angle, positionX, positionY) => bullets.push(new Bullet(angle, positionX, positionY));

    setInterval(() => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      if(player.dead){
        setScreen(SCREEN.GAME_OVER);
        setScore(player.score);
        return;
      }

      player.update(fireBulletCb);
      player.draw(ctx); 

      const random = getRandomNumber(0, 400);
      const random2 = getRandomNumber(0, 400);
      if(enemies.length < MAX_ENEMY_COUNT && (Date.now() - lastEnemySpawnAt) > 1500){
        enemies.push(new Enemy(
          Math.random() < 0.5 ? getRandomNumber(-random, GAME_WIDTH / 2 - random) : getRandomNumber(GAME_WIDTH + random, GAME_WIDTH / 2 + random),
          Math.random() < 0.5 ? getRandomNumber(-random, GAME_HEIGHT / 2 - random) : getRandomNumber(GAME_HEIGHT + random, GAME_HEIGHT / 2 - random)
        ));
        lastEnemySpawnAt = Date.now();
      }

      enemies = enemies.filter(enemy => !enemy.dead)
      enemies.forEach((enemy) => {
        enemy.update(player, bullets);
        enemy.draw(ctx);
      });

      bullets = bullets.filter(bullet => !bullet.dead)
      bullets.forEach((bullet) => {
        bullet.update(player);
        bullet.draw(ctx);
      });
      
    }, 1000 / 30);
  });

  return (
        <div>
          <canvas id="myCanvas" width={GAME_WIDTH} height={GAME_HEIGHT} style={{ border: '1px solid #000000' }}>
            SMTH
          </canvas>
        </div>
      )
}

export default Game;
