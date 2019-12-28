import { Enemy } from "./Enemy";


export class EnemiesManager {

    enemies: Enemy[]
    gameScene: Phaser.Scene


    constructor(gameScene: any) {
        this.gameScene = gameScene
        this.enemies = [new Enemy(gameScene, 32, 32), new Enemy(gameScene, 64, 64)]
    }


    clearEnemies() {
        while (this.enemies.length) { this.enemies.pop() }
    }


    createEnemies() {
        for (let enemy of this.enemies) {
            console.log(enemy)
            this.gameScene.add.existing(enemy)
        }
    }


    getEnemyAt(x:number, y:number) {
        for (let enemy of this.enemies) {
            if (enemy.x == x && enemy.y == y) {
                return enemy
            } 
        }
        return null
    }
    

    removeEnemy(enemy:Enemy) {
        const index = this.enemies.indexOf(enemy, 0);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }

        this.enemies = this.enemies.filter(obj => obj !== enemy)

        enemy.destroy()
    }


    generateEnemy() {
        // generate enemy in bounds of map
        // there can't be another enemy in place
        // and there can't be wall in place   
    }


}