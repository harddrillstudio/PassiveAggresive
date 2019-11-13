
class HUDScene extends Phaser.Scene {


    constructor() {
        super({ key: 'UIScene', active: true });
    }


    create() {

        //  Our Text object to display the Score
        let infoP = this.add.text(100, 10, this.score, { font: '12px Arial', fill: '#000000' });
        let infoE = this.add.text(100, 30, this.score, { font: '12px Arial', fill: '#000000' });

        //  Grab a reference to the Game Scene
        let gameScene = this.scene.get('GameScene');

        //  Listen for events from it
        gameScene.events.on('moved', function () {

            infoP.setText('Health: ' + this.player.health +"/"+ this.player.maxHealth + this.player.alive);
            if (this.enemy == null) {
                infoE.destroy();
            } else
                infoE.setText('Enemy: ' + this.enemy.health +"/"+ this.enemy.maxHealth);

        }, gameScene);
    }

    // update() {
    //     this.score++;
    // }

}
