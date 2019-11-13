
class HUDScene extends Phaser.Scene {


    constructor() {
        super({ key: 'UIScene', active: true });
    }


    create() {

        //  Our Text object to display the Score
        let info = this.add.text(100, 10, this.score, { font: '12px Arial', fill: '#000000' });

        //  Grab a reference to the Game Scene
        let gameScene = this.scene.get('GameScene');

        //  Listen for events from it
        gameScene.events.on('moved', function () {

            info.setText('Health: ' + this.player.health +"/"+ this.player.maxHealth + ' Enemy: ' + this.enemy.health +"/"+ this.enemy.maxHealth);

        }, gameScene);
    }

    // update() {
    //     this.score++;
    // }

}
