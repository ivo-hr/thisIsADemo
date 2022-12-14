import Enemy from "./enemy.js";
import BirdShit from "../hazards/birdShit.js";
/**
 * Clase para los objetos ball que chocan con el jugador
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Bird extends Enemy {
  
    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
     constructor(scene, x, y, tam) {
      super(scene, x, y, tam, 'bird');

      this.speed = 200;
      this.movingRight = true;
      this.movingUp = false;
      this.setFlip(true, false);
      this.heightVar = 100;
      this.minLimit = y - this.heightVar;
      this.maxLimit = y + this.heightVar;
      this.body.onWorldBounds = true;


      this.myScore = 20;
      this.shitIsTaken = true;

      //el pajaro tiene menos vida que el enemigo común
      this.hp = 1;

    }
  
    animation(){
      this.scene.anims.create({
        key: 'movingBird',
        frames: this.scene.anims.generateFrameNumbers('bird', { start: 0, end: 3 }),
        frameRate: 12,
        repeat: -1
  
      })

      this.play('movingBird');
    }


    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */

    poop() {
      this.scene.obstacles.add(new BirdShit(this.scene, this.x, this.y));
    }
    cagable(){  
      let timer=this.scene.time.addEvent({
        delay: 3000, 
        callback: this.setCagable,
        callbackScope: this,
     });
    }
    setCagable(){
      if(!this.shitIsTaken) 
      this.shitIsTaken = true;
    }
    preUpdate(t, dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t, dt);

      //comprueba si se choca con los limites del mundo
      if(this.body.blocked.left || this.body.blocked.right){
        this.movingRight = !this.movingRight;
        if(this.movingRight) this.setFlip(true, false);
        else this.setFlip(false, false);
      }
      if(this.shitIsTaken){
        this.poop();
        this.shitIsTaken = false;
        this.cagable();
      }

      if(this.movingRight){
        this.body.setVelocityX(this.speed);
      }
      else{
        this.body.setVelocityX(-this.speed);
      }
      if(this.y <= this.minLimit){
        this.movingUp = false;
        }    
        else if(this.y >= this.maxLimit){
          this.movingUp = true;
        }
      if(this.movingUp){
        this.body.setVelocityY(-this.speed);
      }
      else{
        this.body.setVelocityY(this.speed);
      }

      if (this.scene.physics.overlap(this.scene.player, this)&&!this.scene.player.invincible) {
        this.scene.player.setInvincible();
        this.scene.player.minusHealth(2);
      }
      this.checkHP();

    }

   
    generateSounds(sfxConfig){
      this.pengu = this.scene.sound.add('pengu', sfxConfig);

    }
  }