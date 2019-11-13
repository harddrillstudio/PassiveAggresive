var cursors;

var unit = 16;

class Scene2 extends Phaser.Scene {
    constructor() {
        super("GameScene");

        this.map; // Map
        this.tiles; // Tiles
        this.layerFloor; this.layerWalls; // Layers
        this.objSpawn, this.objInter, this.objTelep; // Objects from object layers
        this.player;
        this.enemy;
    }


    preload() {
        this.load.image('tester_tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16.png');
        this.load.tilemapTiledJSON({
            key: 'map1',
            url: 'assets/tilemaps/maps/map1.json'
        });
        this.load.tilemapTiledJSON({
            key: 'map2',
            url: 'assets/tilemaps/maps/map2.json'
        });
        this.load.image('player', 'assets/sprites/player.png');
    }


    create() {
        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

        // Map
        this.makeMap('map1');

        // Tiles
        this.tiles = this.map.addTilesetImage('tester_tiles');

        // Layers
        this.layerFloor = this.map.createStaticLayer('floor', this.tiles);
        this.layerWalls = this.map.createStaticLayer('walls', this.tiles);

        // Objects from object layers
        this.objInter = this.map.createFromObjects('interact', 52, {key: "player"});
        this.objSpawn = this.map.getObjectLayer('spawn');
        this.objTelep = this.map.getObjectLayer('teleport');

        let spawnPoint = this.map.findObject("spawn", obj => obj.name === "spawn_origin");

        // Player
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);
        this.add.existing(this.player);

        // Enemy
        this.enemy = new Enemy(this, 64, 32);
        this.add.existing(this.enemy);

        // Camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Input
        this.input.keyboard.on('keydown', this.onKeyInput, this);

    }
    /*
        1. entity are not passable
        2. walls are not passable
    */
    onKeyInput(event) {
        let nextThing;

        if(event.code === "ArrowUp") {
            nextThing = this.checkEntity(this.player.x, this.player.y - unit);

            if (nextThing != null) {
                this.hit(this.player, this.nextThing);
            } else if (!this.mapCollides(this.player.x, this.player.y - unit)) {
                this.player.y -= unit;
            }
        }
        if(event.code === "ArrowDown") {
            nextThing = this.checkEntity(this.player.x, this.player.y + unit);

            if (nextThing != null) {
                this.hit(this.player, this.nextThing);
            } else if (!this.mapCollides(this.player.x, this.player.y + unit)) {
                this.player.y += unit;
            }
        }
        if(event.code === "ArrowLeft") {
            nextThing = this.checkEntity(this.player.x - unit, this.player.y);

            if (nextThing != null) {
                this.hit(this.player, this.nextThing);
            } else if (!this.mapCollides(this.player.x - unit, this.player.y)) {
                this.player.x -= unit;
            }
        }
        if(event.code === "ArrowRight") {
            nextThing = this.checkEntity(this.player.x + unit, this.player.y);

            if (nextThing != null) {
                this.hit(this.player, this.nextThing);
            } else if (!this.mapCollides(this.player.x + unit, this.player.y)) {
                this.player.x += unit;
            }
        }
        console.log("x:",this.player.x, "y:",this.player.y);
        this.events.emit('moved');

        // check player life
        if (this.player.health <= 0) {
            this.player.alive = false;
        }

        // check teleports
        if (this.player.x == this.map.getObjectLayer('teleport').objects[0].x && this.player.y == this.map.getObjectLayer('teleport').objects[0].y) {
            console.log("TP MAP");
            this.teleport('map1', 'map2');
        }
    }


    hit(attacker, victim) {
        console.log("HIT!");
        this.enemy.health--;
        if (this.enemy.health <= 0) {
            this.enemy.destroy();
            this.enemy = null;
        }
    }


    mapCollides(x, y) {
        let tile = this.map.getTileAtWorldXY(x, y, false, this.cameras.main, this.layerWalls);

        console.log(tile);
        if (tile == null) {
            return false;
        }
        else {
            this.player.health--;
            return tile.properties['collides'] == true;
        }
    }

    checkEntity(x, y) {
        if (this.enemy == null) {
            return null;
        }
        if (this.enemy.x == x && this.enemy.y == y) {
            return this.enemy;
        }
    }

    makeMap(name) {
        this.map = this.make.tilemap({ key: name });
    }

    teleport(outMap, inMap) {
        this.map.destroy();
        this.makeMap('map2');
        this.player.x = this.map.getObjectLayer('spawn').objects[0].x;
        this.player.y = this.map.getObjectLayer('spawn').objects[0].y;

    }

}
