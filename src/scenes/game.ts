import * as Phaser from "phaser"
import { Player } from "../entities/Player"
import { Enemy } from "../entities/Enemy"
import { EnemiesManager } from "../entities/EnemiesManager"
import { MapManager } from "../maps/MapManager"

var unit = 16;

export class Game extends Phaser.Scene {

    // map: any
    mapManager: MapManager
    // mapName = 'green_road'
    // tiles: any
    // layerFloor: any; layerWalls: any
    // objSpawn: any; objInter: any; objTelep: any
    player: any
    enemiesManager: any

    init() {
        console.log("[03] Initializing game")
        console.log(window.innerHeight)
    }

    preload () {
        console.log("[01] Load assets")
        
        this.load.image('tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16.png')
        this.load.image('tester_green_road', 'assets/tilemaps/tiles/catastrophi_tiles_16.png')

        this.load.tilemapTiledJSON('map1', 'assets/tilemaps/maps/map1.json')
        this.load.tilemapTiledJSON('green_road', 'assets/tilemaps/maps/green_road.json')
        this.load.tilemapTiledJSON('first_city', 'assets/tilemaps/maps/first_city.json')

        this.load.image('player', 'assets/sprites/player.png')
        
        console.log("[02] Finished preloading")
        this.scene.launch('HUDScene')
    }

    create() {
        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"})

        // Map
        // this.makeMap(this.mapName)
        this.mapManager = new MapManager(this)
        console.log("[04] Map created")

        // Tiles
        // this.tiles = this.map.addTilesetImage('tileset_tiled', 'tiles')

        // Layers
        // this.layerFloor = this.map.createStaticLayer('floor', this.tiles)
        // this.layerWalls = this.map.createStaticLayer('walls', this.tiles)

        // Objects from object layers
        // this.objInter = this.map.createFromObjects('interact', 52, {key: "player"})
        // this.objSpawn = this.map.getObjectLayer('spawn')
        // this.objTelep = this.map.getObjectLayer('teleport')
        
        let spawnPoint = this.mapManager.getSpawnPoint()
        
        // let spawnPoint = this.map.findObject("spawn", this.isSpawnOrigin)
        // if (spawnPoint == null) {
        //     spawnPoint = this.map.findObject("spawn", (obj: any) => obj.properties[0].type == "sp")
        // }

        // Player
        this.player = new Player(this, spawnPoint.x, spawnPoint.y)
        this.add.existing(this.player)

        // Enemy
        this.enemiesManager = new EnemiesManager(this)
        this.enemiesManager.createEnemies()

        // Camera
        this.cameras.main.setBounds(0, 0, this.mapManager.map.widthInPixels, this.mapManager.map.heightInPixels)
        this.cameras.main.startFollow(this.player).setZoom(2);

        // Input
        this.input.keyboard.on('keydown', this.onKeyInput, this)

        this.debug()
    }


    onKeyInput(event:any) {
        let nextThing
        // check nextThing, which player steps into
        // if there is something, then hit it
        // if there isn't thing and not collision, then walk
        if(event.code === "ArrowUp") {
            nextThing = this.checkEntity(this.player.x, this.player.y - unit)

            if (nextThing != null) {
                this.hit(this.player, nextThing)
            } else if (!this.mapCollides(this.player.x, this.player.y - unit)) {
                this.player.y -= unit
            }
        }

        if(event.code === "ArrowDown") {
            nextThing = this.checkEntity(this.player.x, this.player.y + unit)

            if (nextThing != null) {
                this.hit(this.player, nextThing)
            } else if (!this.mapCollides(this.player.x, this.player.y + unit)) {
                this.player.y += unit
            }
        }

        if(event.code === "ArrowLeft") {
            nextThing = this.checkEntity(this.player.x - unit, this.player.y)

            if (nextThing != null) {
                this.hit(this.player, nextThing)
            } else if (!this.mapCollides(this.player.x - unit, this.player.y)) {
                this.player.x -= unit
            }
        }

        if(event.code === "ArrowRight") {
            nextThing = this.checkEntity(this.player.x + unit, this.player.y)

            if (nextThing != null) {
                this.hit(this.player, nextThing)
            } else if (!this.mapCollides(this.player.x + unit, this.player.y)) {
                this.player.x += unit
            }
        }

        console.log("x:",this.player.x, "y:",this.player.y)
        this.events.emit('moved')

        // check player life
        this.player.checkAlive()
        if (!this.player.alive) {
            this.scene.stop()
        }

        // check teleports
        // let teleports = this.mapManager.map.filterObjects("teleport", this.tileObjectIsTeleport)

        // for (const tp of teleports) {
        //     if (this.player.x == tp.x && this.player.y == tp.y) {
        //         console.log("TP MAP", this.mapManager.mapName, "--->", tp.properties[0].value)
        //         this.teleport(this.mapManager.mapName, tp.properties[0].value)
        //     }
        // }

    }

    
    tileObjectIsTeleport(obj: any) {
        return obj.properties[0].name === "tp"
    }


    // isSpawnOrigin(obj: any) {
    //     return obj.name === "spawn_origin"
    // }


    hit(attacker:any, victim:any) {
        console.log("HIT!")
        victim.health--
        if (victim.health <= 0) {
            this.enemiesManager.removeEnemy(victim)
            attacker.exp += victim.exp
        }
    }


    checkEntity(x:number, y:number) {
        return this.enemiesManager.getEnemyAt(x, y)
    }


    mapCollides(x:number, y:number) {
        let tile = this.mapManager.map.getTileAtWorldXY(x, y, false, this.cameras.main, this.mapManager.layerWalls);

        // console.log(tile)
        if (tile == null) {
            return false
        }
        else {
            this.player.health--
            return tile.properties['collides'] == true
        }
    }


    // makeMap(name: string) {
    //     this.map = this.make.tilemap({ key: name })
    // }


    // teleport(oldMapName:string, newMapName:string) {
    //     this.map.destroy()
    //     this.player.destroy()
    //     this.makeMap(newMapName)
    //     this.mapName = newMapName
    //     this.player.x = this.map.getObjectLayer('spawn').objects[0].x
    //     this.player.y = this.map.getObjectLayer('spawn').objects[0].y

    //     // Layers
    //     this.layerFloor = this.map.createStaticLayer('floor', this.tiles)
    //     this.layerWalls = this.map.createStaticLayer('walls', this.tiles)

    //     // Objects from object layers
    //     this.objSpawn = this.map.getObjectLayer('spawn')
    //     this.objTelep = this.map.getObjectLayer('teleport')

    //     // Player
    //     console.log(oldMapName);
    //     let spawnPoint = this.map.findObject("spawn", (obj: any) => obj.properties[0].value == oldMapName)
        
    //     this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    //     this.add.existing(this.player)

    //     // Enemies
    //     this.enemiesManager.createEnemies()

    //     // Camera
    //     this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    //     this.cameras.main.startFollow(this.player)
    // }


    debug() {}
}