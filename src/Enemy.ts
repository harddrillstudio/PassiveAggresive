import * as Phaser from "phaser"

export class Enemy extends Phaser.GameObjects.Sprite {

    alive:boolean
    maxHealth:number
    health:number
    maxMana:number
    mana:number
    atk:number
    def:number

    constructor(scene:Phaser.Scene, x=16, y=16) {
        super(scene, x, y, 'player')

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