
class Enemy extends Phaser.GameObjects.Sprite {


    constructor(scene, x=16, y=16) {
        super(scene, x, y, 'player');

        this.setOrigin(0);
        this.setStats();
    }


    setStats() {
        this.alive = true;
        this.maxHealth = 20;
        this.health = 20;

        this.maxMana = 20;
        this.mana = 20;

        this.atk = 1;
        this.def = 1;
    }

}
