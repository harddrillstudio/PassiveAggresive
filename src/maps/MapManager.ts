import * as Phaser from "phaser"


export class MapManager {

    gameScene: Phaser.Scene

    map: any
    mapName = 'green_road'
    tiles: any
    layerFloor: any; layerWalls: any
    objSpawn: any; objInter: any; objTelep: any
    

    constructor(gameScene:Phaser.Scene) {
        this.gameScene = gameScene

        this.create()
    }


    preload() {

    }


    create() {

        // Map
        this.makeMap(this.mapName)

        // Tiles
        this.tiles = this.map.addTilesetImage('tileset_tiled', 'tiles')

        // Layers
        this.layerFloor = this.map.createStaticLayer('floor', this.tiles)
        this.layerWalls = this.map.createStaticLayer('walls', this.tiles)

        // Objects from object layers
        this.objInter = this.map.createFromObjects('interact', 52, {key: "player"})
        this.objSpawn = this.map.getObjectLayer('spawn')
        this.objTelep = this.map.getObjectLayer('teleport')
    }


    getSpawnPoint() {
        let spawnPoint = this.map.findObject("spawn", this.isSpawnOrigin)
        if (spawnPoint == null) {
            spawnPoint = this.map.findObject("spawn", (obj: any) => obj.properties[0].type == "sp")
        }

        return spawnPoint
    }


    makeMap(name: string) {
        this.map = this.gameScene.make.tilemap({ key: name })
    }


    isSpawnOrigin(obj: any) {
        return obj.name === "spawn_origin"
    }



}