

 export default class Enemy extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
    constructor(scene, x, y, tam, imageName) {
      super(scene, x, y, imageName);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.scene.physics.add.collider(this, this.scene.layer5);
      this.initialize(tam)
      this.hp = 2;

      this.myScore = 10;
      this.animation();
    }

    initialize(tam){
      this.setFlip(true, false);
      this.size = tam;
      this.sizeManag();


    }

    animation(){
      //nada en este
    }

    //configura el score que da al morir
    setScore(score){
      this.myScore = score;
    }
    

    //Redimensiona el objeto en funcion de su tamaño
    sizeManag(){
        if(this.size == 0){
            this.setScale(0.25);
        }
        else if(this.size == 1){
            this.setScale(0.5);
        }
        else{
            this.setScale(1);
        }
    }

    //funcion que se ejecuta al morir, se encarga de destruir el objeto y añadir el score al jugador
    onDestroy(){
      this.scene.player.addScore(this.myScore);
      this.destroy();
    }

    
  //funcion que se ejecuta al colisionar con el jugador, se encarga de restarle vida al jugador
    minusHP(number){
      this.hp -= number;

    }

    //chequea si el enemigo esta muerto
    checkHP(){
      if(this.hp <= 0)
        this.onDestroy();
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t, dt);
      
    }
  }