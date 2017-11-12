const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 120
const positions = []
let buffer;
GeometryFactory.addType("frame", {}, gl => {
  const geometry = new Geometry(gl)
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < n; i++) {
      positions[3 * (i + n * j) + 0] = i / n - 0.5
      positions[3 * (i + n * j) + 1] = -(j / n - 0.5)
      positions[3 * (i + n * j) + 2] = 0
    }
  }
  const texCoord = []
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < n; i++) {
      texCoord[2 * (i + n * j) + 0] = 1 - i / (n - 1)
      texCoord[2 * (i + n * j) + 1] = j / (n - 1)
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addAttributes(texCoord, {
    TEXCOORD: {
      size: 2
    }
  })
  let indices = []
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - 1; j++) {
      indices.push(n * i + j)
      indices.push(n * i + j + 1)
    }
  }
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n; j++) {
      indices.push(n * i + j)
      indices.push(n * (i + 1) + j)
    }
  }
  geometry.addIndex("default", Array.from({
    length: positions.length / 3
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  geometry.addIndex("line", indices, WebGLRenderingContext.LINES)
  buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
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
