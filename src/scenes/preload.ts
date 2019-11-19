import * as Phaser from "phaser"

export class Preload extends Phaser.Scene {
  init() {}

  preload () {
    // console.log("[01] Load assets")
    
    // this.load.image('tester_tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16.png')
    // // this.load.image('green_road_tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16_red.png')

    // this.load.tilemapTiledJSON('map1', 'assets/tilemaps/maps/map1.json')
    // // this.load.tilemapTiledJSON('map2', 'assets/tilemaps/maps/map2.json')
    // // this.load.tilemapTiledJSON('map3', 'assets/tilemaps/maps/map3.json')
    // // this.load.tilemapTiledJSON('green_road', 'assets/tilemaps/maps/green_road.json')
    // this.load.tilemapTiledJSON('test_map', 'assets/tilemaps/maps/test_map.json')

    // this.load.image('player', 'assets/sprites/player.png')
    
    // console.log("[02] Finished preloading")
    this.scene.start("game")
  }
}