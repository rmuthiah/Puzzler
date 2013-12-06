// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('Platform', {
  init: function() {
    this.requires('2D, Canvas, Solid, Color')
      .color('black');
  },
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_player, Gravity, SpriteAnimation')
      .fourway(4)
      .gravity('Platform')
      .gravityConst(.6)
      .collision()
      .stopOnSolids()
      .animate('PlayerMovingUp',    0, 0, 3)        // I changed this part here
      .animate('PlayerMovingRight', 0, 3, 3)
      .animate('PlayerMovingDown',  0, 2, 3)
      .animate('PlayerMovingLeft',  0, 1, 3);       // until here
    
    var animation_speed = 8;
    
    this.bind('NewDirection', function(data) {
        if (data.x > 0) {
          this.animate('PlayerMovingRight', animation_speed, -1);
        } else if (data.x < 0) {
          this.animate('PlayerMovingLeft', animation_speed, -1);
        } else if (data.y > 0) {
          this.animate('PlayerMovingDown', animation_speed, -1);
        } else if (data.y < 0) {
          this.animate('PlayerMovingUp', animation_speed, -1);
        } else {
          this.stop();
        }
      });
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});
