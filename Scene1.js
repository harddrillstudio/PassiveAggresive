
var spacebar;
var counter = 0;

class Scene1 extends Phaser.Scene {

    constructor() {
        super("bootGame");
    }

    create() {
        this.add.text(20, 20, "This is a main menu.");

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.data.set('lives', 3);
        this.data.set('level', 5);
        this.data.set('score', 2000);

        var text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });

        text.setText([
            'Level: ' + this.data.get('level'),
            'Lives: ' + this.data.get('lives'),
            'Score: ' + this.data.get('score')
        ]);

        this.scene.start("GameScene");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            lolek();
        }

        // if (counter >= 1) {
        //     this.scene.start("GameScene");
        // }

    }
}

function lolek() {
    counter++;
    console.log(counter);
}
