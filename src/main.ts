import * as Phaser from "phaser";
import { Preload } from "./scenes/preload";
import { Game } from "./scenes/game";
import { HUDScene } from "./scenes/HUDScene";


class Main extends Phaser.Game {
    constructor() {
    const gameConfig: any = {
        backgroundColor: 0x666666,
        pixelArt: true,
        scale: {
            parent: 'root',
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: '50%',
            height: '50%'
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y:0 }
            }
        },
    };
    super(gameConfig);

    this.scene.add("preload", Preload, false);
    this.scene.add("game", Game, false);
    this.scene.add("HUDScene", HUDScene, false)

    this.scene.start("preload");
    }
}

window.onload = () => {
    const GameApp: Phaser.Game = new Main();
};