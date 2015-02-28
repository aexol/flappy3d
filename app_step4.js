(function(){
var world, camera, flap, gamePaused, jump, boxes, lastObstacle, lights;
var unitsToMeters = 0.66
var pause = function() {
  gamePaused = !gamePaused
}
var setup = function() {
  setGL("agl");
  gamePaused = false
  var agl = new aexolGL();
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
materials.gora.setParent(shad)
materials.dol.setParent(shad)
meshes = {}
objects = {}

pivots = {
  wholebird: new Pivot(),
  wing1: new Pivot(),
  wing2: new Pivot(),
  look: new Pivot()
}
shadery = {
  sfera: niebo
}
Mesh.obj("flappy3d.obj", function(e) {
  for (var i in e) {
    //NEW IN STEP 4
    meshes[i] = e[i].rotate(0, -90, 0)
    if (i != "dol" && i != "gora") {
    objects[i] = new GameObject(world, {
      shader: shadery[i] || shad,
      material: materials[i],
      light: lights,
      mesh: meshes[i]
    })
    objects[i].aex.centerPivot()
  }
    else{
      meshes[i].setParent(materials[i])
    }
    //NEW IN STEP 4
  }

  //NEW IN STEP 4
  for (var i = 0; i < 20; i++) {
    obstacles.push(new Obstacle(meshes.gora,meshes.dol))
  }
  //NEW IN STEP 4
  pivots.wing1.add(objects.skrzydlo1).setPivot(new Vector(-0.2,0,0).add(objects.skrzydlo1.position))
  pivots.wing2.add(objects.skrzydlo2).setPivot(new Vector(0.2,0,0).add(objects.skrzydlo2.position))
  pivots.wholebird.add(objects.bird).add(objects.dziob).add(objects.okobialko).add(objects.okosrodek).add(pivots.wing1).add(pivots.wing2).setPivotToCenter()
})
//NEW IN STEP 4
Obstacle = function (mesh,mesh2,start) {
  var scale = 14.0
  var segHeight = 1.0
  this.index = start
  this.segDown = new Aex()
  this.segDown.setParent(mesh2)
  this.segUp = new Aex()
  this.segUp.setParent(mesh2)
  this.up = new Aex()
  this.up.rotate(-180,0,0)
  this.up.position = new Vector(0,4,0)
  this.segUp.position = new Vector(0,4+segHeight*scale,0)
  this.segUp.scale(1.0,scale,1.0)
  this.up.setParent(mesh)
  this.down = new Aex()
  this.down.setParent(mesh)
  this.down.position = new Vector(0,-4,0)
  this.segDown.position = new Vector(0,-4-segHeight*scale,0)
  this.segDown.scale(1.0,scale,1.0)
  this.game = new Pivot()
  this.game.add(this.up).add(this.down).add(this.segUp).add(this.segDown).setPivotToCenter()
  this.insert()
}
lastObstacle = null
Obstacle.prototype.insert = function () {
  var mr = -5+Math.random()*10
  mr = Math.floor(mr)
  var newZ = lastObstacle-10
  this.game.y = mr
  this.game.z = newZ
  lastObstacle = newZ
}
//NEW IN STEP 4
Flappy = function () {
  this.game = pivots.wholebird
  this.mass = 1.0
  this.velocity = 0.0
}
flap = new Flappy()
function flappyFlap() {
  flap.velocity = 0.34
}
gl.canvas.addEventListener("touchstart", function (e) {
  e.preventDefault()
  flappyFlap()
})
gl.canvas.addEventListener("mousedown", function (e) {
  e.preventDefault()
  flappyFlap()
})

camera.setLookAt(new Vector(7, 3, -4), new Vector(0, 1, 0), new Vector(0, 1, 0))
}
var logic = function() {
  for (var o in obstacles) {
    var ob = obstacles[o]
    var zpos = ob.game.z
    var ypos = ob.game
    if (zpos<lastObstacle){
      lastObstacle = zpos
    }
    if (zpos < 10.0) {
      ob.game.z += 0.1
    } else {
      ob.insert()
    }
    //COLLISIONS
  }
  flap.velocity -= 9.81 * 0.0014
  flap.game.y += flap.velocity
  var nV = (-flap.game.rotX+flap.velocity*300)/3.0
  flap.game.rotX = -nV
}
var draw = function() {
  if (!gamePaused) {
    world.draw(camera)
  }
}
app = AexolGL("agl",{
  setup:setup,
  logic:logic,
  draw:draw
})
})()
