(function(){
var world, camera, flap, gamePaused, jump, boxes, lastObstacle, lights;
var unitsToMeters = 0.66
var pause = function() {
  gamePaused = !gamePaused
}
var setup = function() {
  gamePaused = false
  world = new Scene();
  camera = new Camera(0.1, 100, 45)
  PATH = ''
  niebo = basicShader({})
  shad = basicShader({
    useLights: true
  })
  lights = new Light([
    //POINT LIGHT
    {
      lightPosition: new Vector(20.0, 20.0, -20.0),
      attenuation: 200.0,
      intensity: 0.5,
      color: [1.0, 0.9, 0.9]
    },
    //AMBIENT LIGHT
    {
      intensity: 0.5,
      lightType: 2.0,
      color: [0.8, 0.8, 0.8]
    }
  ])
  obstacles = []
  materials = {
    bird: new Material({
      color: [1.0, 1.0, 0.0]
    }),
    skrzydlo1: new Material({
      color: [1.0, 1.0, 0.0]
    }),
    skrzydlo2: new Material({
      color: [1.0, 1.0, 0.0]
    }),
    dol: new Material({
      color: [0.0, 1.0, 0.0]
    }),
    gora: new Material({
      color: [0.0, 1.0, 0.0]
    }),
    dziob: new Material({
      color: [1.0, 0.5, 0.0]
    }),
    okobialko: new Material({
      color: [1.0, 1.0, 1.0]
    }),
    sfera: new Material({
      color: [0.5, 0.5, 1.0]
    }),
    okosrodek: new Material({
      color: [0.0, 0.0, 0.0]
    })
  }
  meshes = {}
  objects = {}
  shadery = {
    sfera: niebo
  }
  Mesh.obj("flappy3d.obj", function(e) {
    for (var i in e) {
      meshes[i] = e[i].rotate(0, -90, 0)
      objects[i] = new GameObject(world, {
        shader: shadery[i] || shad,
        material: materials[i],
        light: lights,
        mesh: meshes[i]
      })
      objects[i].aex.centerPivot()
    }
  })
  camera.setLookAt(new Vector(7, 3, -4), new Vector(0, 1, 0), new Vector(0, 1, 0))
}
var logic = function() {
  // obstacle logic
}
var draw = function() {
  if (!gamePaused) {
    world.draw(camera)
  }
}

app = AexolGL("agl",{
  setup:setup,
  draw:draw
})
})()
