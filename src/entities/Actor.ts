import * as Phaser from "phaser"

export class Actor extends Phaser.GameObjects.Sprite  {

    alive:boolean
    maxHealth:number
    health:number
    maxMana:number
    mana:number
    atk:number
    def:number
    exp:number


    constructor(scene:Phaser.Scene, x=16, y=16, actorKey:string) {
        super(scene, x, y, actorKey)

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

        this.exp = 100;
    }


    isAlive() {
        return (this.health >= 0) ? true : false
    }

    
    checkAlive() {
        if (this.isAlive()) {
            this.alive = true
        }
        else {
            this.alive = false
        }
    }

}