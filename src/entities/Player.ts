import * as Phaser from "phaser"
import { Actor } from "./Actor";


export class Player extends Actor {

    constructor(scene:Phaser.Scene, x=16, y=16) {
        super(scene, x, y, 'player')
    }

}