var cursors;

var unit = 16;

class Scene2 extends Phaser.Scene {
    constructor() {
        super("GameScene");

        this.map;
        this.tiles;
        this.layer; this.secondLayer, this.layer3, this.spawns;
        this.objects;
        this.player;
        this.enemy;
    }


    preload() {
        this.load.image('tester_tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16.png');
        this.load.tilemapTiledJSON({
            key: 'mapJSON',
            url: 'assets/tilemaps/maps/map1.json'
        });
        this.load.image('player', 'assets/sprites/player.png');
    }


    create() {
        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

        // Map
        this.map = this.make.tilemap({ key: 'mapJSON' });
        // Tiles
        this.tiles = this.map.addTilesetImage('tester_tiles');
        // Layers
        this.layer = this.map.createStaticLayer('floor_lay', this.tiles, 0, 0);
        this.secondLayer = this.map.createStaticLayer('houses', this.tiles, 0, 0);
        this.layer3 = this.map.createStaticLayer('interact', this.tiles, 0, 0);

        // Objects
        this.objects = this.map.createFromObjects('interact', 52, {key: "player"});
        this.spawns = this.map.getObjectLayer('spawns');

        console.log(this.objects);

        var xSpawn = this.spawns.objects[0].x;
        var ySpawn = this.spawns.objects[0].y;

        // Player
        this.player = new Player(this, xSpawn, ySpawn);
        this.add.existing(this.player);

        // Enemy
        this.enemy = new Player(this, 64, 32);
        this.add.existing(this.enemy);

        // Camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Input
        this.input.keyboard.on('keydown', this.onKeyInput, this);

    }


    update() {
    }


    onKeyInput(event) {

        if(event.code === "ArrowUp") {
            if (this.enemy.x == this.player.x && this.enemy.y == this.player.y - unit) {
                this.hit(this.player, this.enemy);
            }

            else if (!this.mapCollides(this.player.x, this.player.y - unit)) {
                this.player.y -= unit;
            }
        }
        if(event.code === "ArrowDown") {
            if (!this.mapCollides(this.player.x, this.player.y + unit)) {
                this.player.y += unit;
            }
        }
        if(event.code === "ArrowLeft") {
            if (!this.mapCollides(this.player.x - unit, this.player.y)) {
                this.player.x -= unit;
            }
        }
        if(event.code === "ArrowRight") {
            if (!this.mapCollides(this.player.x + unit, this.player.y)) {
                this.player.x += unit;
            }
        }

        console.log("x:",this.player.x, "y:",this.player.y);

        this.events.emit('moved');
    }


    hit(attacker, victim) {
        console.log("HIT!");
        this.enemy.health--;
    }


    mapCollides(x, y) {
        let tile = this.map.getTileAtWorldXY(x, y, false, this.cameras.main, this.secondLayer);

        console.log(tile);
        if (tile == null) {
            return false;
        }
        else {
            this.player.health--;
            return tile.properties['collides'] == true;
        }
    }


}
