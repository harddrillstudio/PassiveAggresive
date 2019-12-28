import * as Phaser from "phaser"
import { Actor } from "./Actor";

export class Enemy extends Actor {

    constructor(scene:Phaser.Scene, x=16, y=16) {
        super(scene, x, y, 'player')
    }

}