(function() {

  var world, camera,gamePaused;
  var pause = function() {
    gamePaused = !gamePaused
  }
  var setup = function() {
    gamePaused = false
    world = new Scene();
    camera = new Camera(0.1, 100, 45)
  }
  var logic = function() {
    // obstacle logic
  }
  var draw = function() {
    if (!gamePaused) {
      world.draw(camera)
    }
  }
  app = AexolGL("agl", {
    setup: setup,
    draw: draw
  })

})()
