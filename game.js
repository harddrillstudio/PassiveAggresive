var config = {
    backgroundColor: 0x666666,
    pixelArt: true,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '20%',
        height: '20%'
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:0 }
        }
    },
    scene: [
        Scene1,
        Scene2,
        HUDScene
    ]
}


var game = new Phaser.Game(config);
