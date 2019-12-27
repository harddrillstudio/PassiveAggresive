import * as Phaser from "phaser"

export class HUDScene extends Phaser.Scene {

    infoP: any
    infoE: any
    graphics: any
    frameHP: Phaser.Geom.Rectangle
    frameMN: Phaser.Geom.Rectangle
    length = 80

    constructor() {
        super('HUDScene')
    }

    create() {

        //  Our Text object to display the Score
        this.infoP = this.add.text(100, 10, 'player', { font: '12px Arial', fill: '#000000' })
        this.infoE = this.add.text(100, 30, 'enemy', { font: '12px Arial', fill: '#000000' })

        this.frameHP = new Phaser.Geom.Rectangle(710, 10, this.length, 20) // HP Frame
        this.frameMN = new Phaser.Geom.Rectangle(710, 40, this.length, 20) // Mana Frame
        
        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 1,
                color: 0x000000,
                alpha: 1
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        });
        
        this.graphics.strokeRectShape(this.frameHP)
        this.graphics.strokeRectShape(this.frameMN)

        //  Grab a reference to the Game Scene
        let gameScene = this.game.scene.getScene('game');
        console.log(gameScene)

        //  Listen for events from it
        gameScene.events.on('moved', () => this.render(gameScene))
    }

    render(sc: any) {
        this.graphics.clear()

        this.infoP.setText('Health: ' + sc.player.health +"/"+ sc.player.maxHealth + sc.player.alive)
        if (sc.enemy == null) {
            this.infoE.destroy()
        } else {
            this.infoE.setText('Enemy: ' + sc.enemy.health +"/"+ sc.enemy.maxHealth)
        }
        
        // HP and Mana Rects

        let fillHP = new Phaser.Geom.Rectangle(710, 10, this.length*sc.player.health/sc.player.maxHealth, 20) // HP Frame
        let fillMN = new Phaser.Geom.Rectangle(710, 40, this.length*sc.player.mana/sc.player.maxMana, 20) // Mana Frame

        this.graphics.fillStyle(0xff0000, 50)
        this.graphics.fillRectShape(fillHP)

        this.graphics.fillStyle(0x0000ff, 0.5)
        this.graphics.fillRectShape(this.frameMN)

        // HP and Mana frames
        this.graphics.strokeRectShape(this.frameHP)
        this.graphics.strokeRectShape(this.frameMN)
    }


}