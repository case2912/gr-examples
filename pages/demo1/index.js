const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 40
GeometryFactory.addType("particle", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  const texcoord = []
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions.push((i / (n - 1) - 0.5))
      positions.push((j / (n - 1) - 0.5))
      positions.push(0)

      texcoord.push(i / (n - 1))
      texcoord.push(j / (n - 1))
    }
  }
  geometry.addAttributes([-0.015, 0.02, 0, 0.015, 0.02, 0, 0.015, -0.02, 0, -0.015, -0.02, 0], {
    POSITION: {
      size: 3
    }
  });
  geometry.addAttributes(positions, {
    POSITION_BASE: {
      size: 3,
      instancingDivisor: 4
    }
  })
  geometry.addAttributes(texcoord, {
    TEXCOORD: {
      size: 2,
      instancingDivisor: 4
    }
  })
  geometry.addIndex("default", n * n * 4, [0, 2, 1, 3, 2, 0, 0, 1, 2, 3, 0, 2]);
  geometry.addIndex("wireframe", n * n * 4, [0, 1, 1, 2, 2, 3, 3, 0], WebGLRenderingContext.LINES);
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
        video.width = n;
        video.height = n;
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
