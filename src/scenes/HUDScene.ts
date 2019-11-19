import * as Phaser from "phaser"

export class HUDScene extends Phaser.Scene {

    constructor() {
        super('HUDScene')
    }

    create() {

        //  Our Text object to display the Score
        let infoP = this.add.text(100, 10, 'lol', { font: '12px Arial', fill: '#000000' })
        let infoE = this.add.text(100, 30, 'lol', { font: '12px Arial', fill: '#000000' })

        let rect = new Phaser.Geom.Rectangle(100, 100, 200, 200);
        
        let graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        });
        graphics.strokeRectShape(rect);

        //  Grab a reference to the Game Scene
        let gameScene = this.game.scene.getScene('game');
        console.log(gameScene)

        //  Listen for events from it
        gameScene.events.on('moved', function (this: any) {

            infoP.setText('Health: ' + this.player.health +"/"+ this.player.maxHealth + this.player.alive)
            if (this.enemy == null) {
                infoE.destroy()
            } else
                infoE.setText('Enemy: ' + this.enemy.health +"/"+ this.enemy.maxHealth)

        }, gameScene);
    }


}