var world;
const init = () => {
  var boundsBody, boxShape;
  var psd, particleSystem;
  world = new b2World(new b2Vec2(0, -10));
  boundsBody = world.CreateBody(new b2BodyDef());
  boxShape = new b2ChainShape();
  boxShape.vertices = [
    [-4, -3],
    [4, -3],
    [4, 3],
    [-4, 3]
  ].map(function(node) {
    return new b2Vec2(node[0], node[1]);
  });
  boxShape.CreateLoop();
  boundsBody.CreateFixtureFromShape(boxShape, 0);


  const rotateL = new b2ChainShape();
  rotateL.vertices = [
    [1,0],
    [3,0],
    [3,0.2]
  ].map(function(node) {
    return new b2Vec2(node[0], node[1]);
  });
  world.CreateBody(new b2BodyDef()).CreateFixtureFromShape(rotateL, 0)
  const rotateR = new b2ChainShape();
  rotateR.vertices = [
    [-1, 0],
    [-3, 0],
    [-3, -0.2]
  ].map(function(node) {
    return new b2Vec2(node[0], node[1]);
  });
  world.CreateBody(new b2BodyDef()).CreateFixtureFromShape(rotateR, 0)

  psd = new b2ParticleSystemDef();
  psd.radius = 0.1;
  psd.dampingStrength = 0.01;
  particleSystem = world.CreateParticleSystem(psd);
  var shape = new b2PolygonShape(),
    pd = new b2ParticleGroupDef();
  const pg = {
    nodes: [
      [-3.5, -2],
      [3.5, -2],
      [3.5, 2.8],
      [-3.5, 2.8]
    ]
  };
  shape.vertices = pg.nodes.map(function(node) {
    return new b2Vec2(node[0], node[1]);
  });
  pd.shape = shape;
  particleSystem.CreateParticleGroup(pd);
}
const sTime = new Date();
var render = function() {
  const nTime = new Date();
  const t = (nTime.getTime() - sTime.getTime()) / 1000.;
  world.bodies[2].SetTransform(new b2Vec2(0, 0), t)
  world.bodies[1].SetTransform(new b2Vec2(0, 0), t)
  world.Step(1.0 / 60.0, 8, 3);
  const p = new Array(world.particleSystems[0].particleGroups[0].GetParticleCount() * 3);
  const b = world.particleSystems[0].GetPositionBuffer()
  const tex = new Float32Array(world.particleSystems[0].particleGroups[0].GetParticleCount() * 3);
  for (var i = 0; i < b.length / 2; i++) {
    p[3 * i + 0] = b[2 * i + 0]
    p[3 * i + 1] = b[2 * i + 1]
    p[3 * i + 2] = 0
    tex[2 * i + 0] = (b[2 * i + 0] / 8 + 0.5) * 0.9 + 0.05
    tex[2 * i + 1] = (b[2 * i + 1] / 6 + 0.5) * 0.9 + 0.05
  }
  pBuffer.update(new Float32Array(p))
  vBuffer.update(tex)
  window.requestAnimationFrame(render);
};

let pBuffer;
let vBuffer;
init();
gr(() => {
  render();
});
const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const positions = new Array(world.particleSystems[0].particleGroups[0].GetParticleCount() * 3)
const texcoord = new Array(world.particleSystems[0].particleGroups[0].GetParticleCount() * 2)
GeometryFactory.addType("particle", {}, gl => {
  const geometry = new Geometry(gl)
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addAttributes(texcoord, {
    TEXCOORD: {
      size: 2
    }
  });
  geometry.addIndex("default", Array.from({
    length: positions.length / 3
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  pBuffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
  vBuffer = geometry.buffers[geometry.accessors["TEXCOORD"].bufferIndex]
  return geometry
})
GeometryFactory.addType("frame", {}, gl => {
  const geometry = new Geometry(gl)
  const p = []
  const vertices = world.bodies[0].fixtures[0].shape.vertices;
  for (var i = 0; i < vertices.length; i++) {
    p.push(vertices[i].x);
    p.push(vertices[i].y);
    p.push(0);
  }
  geometry.addAttributes(p, {
    POSITION: {
      size: 3
    }
  })
  geometry.addIndex("default", [0, 1, 1, 2, 2, 3, 3, 4], WebGLRenderingContext.LINES)
  return geometry
})

gr.registerComponent("WebCamera", {
  attributes: {
    target: {
      converter: "String",
      default: "texture"
    }
  },
  $mount: function() {
    var _this = this;
    navigator.getUserMedia({
        video: true,
        audio: false
      },
      (localMediaStream) => {
        video = document.createElement('video');
        video.width = 256;
        video.height = 256;
        video.addEventListener('canplay', function() {
          video.removeEventListener('canplay', arguments.callee, true);
          video.play();
          _this.node.setAttribute(_this.getAttribute("target"), video);
        }, true);
        video.src = window.URL.createObjectURL(localMediaStream);
      },
      () => {}
    );
  }
});
