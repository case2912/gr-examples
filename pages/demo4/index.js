
const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const positions = new Float32Array(71 * 3)
let buffer;
let texcoordBuffer;
GeometryFactory.addType("frame", {}, gl => {
  const geometry = new Geometry(gl)
  const base = [];
  const texcoord = new Array(71 * 2)
  const n = 20
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const s = Math.PI * 2 * i / (n - 1)
      const p = Math.PI * 2 * j / (n - 1)
      base.push(3* Math.cos(p) * Math.cos(s))
      base.push(3* Math.sin(p))
      base.push(3* Math.cos(p) * Math.sin(s))
    }
  }
  geometry.addAttributes(texcoord, {
    TEXCOORD: {
      size: 2
    }
  })
  geometry.addAttributes(base, {
    POSITION_BASE: {
      size: 3,
      instancingDivisor: 71
    }
  })
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addIndex("face_display", 71 * n * n, [
    0, 14, 1, 1, 14, 13, 1, 13, 2, 2, 13, 12, 2, 12, 3, 3, 12, 11, 3, 11, 4, 4, 11, 10, 4, 10, 9, 4, 9, 5, 5, 9, 6, 6, 9, 8, 6, 8, 7,
    0, 33, 14,
    22, 33, 0, 21, 22, 0, 20, 21, 0, 19, 20, 0,
    18, 14, 33, 18, 17, 14, 17, 16, 14, 16, 15, 14
  ])
  buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
  texcoordBuffer = geometry.buffers[geometry.accessors["TEXCOORD"].bufferIndex]
  return geometry
})

let ctracker = new clm.tracker();
ctracker.init();
navigator.getUserMedia({
    video: true,
    audio: false
  },
  (localMediaStream) => {
    video = document.createElement('video');
    video.addEventListener('canplay', function() {
      video.width = 400;
      video.height = 300;
      video.removeEventListener('canplay', arguments.callee, true);
      video.play();
      ctracker.start(video);
    }, true);
    video.src = window.URL.createObjectURL(localMediaStream);
  },
  () => {}
);

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
        video.width = 400;
        video.height = 300;
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
gr(() => {
  update();
})
const update = () => {
  if (ctracker.getCurrentPosition()) {
    const c = ctracker.getCurrentPosition();
    const p = new Float32Array(71 * 3)
    const tex = new Float32Array(71 * 2)
    for (var i = 0; i < 71; i++) {
      p[3 * i + 0] = (c[37][0] / 400) - (c[i][0] / 400)
      p[3 * i + 1] = (c[37][1] / 400) - (c[i][1] / 300)
      p[3 * i + 2] = 0
      tex[2 * i + 0] = (c[i][0] / 400);
      tex[2 * i + 1] = (c[i][1] / 300);
    }
    buffer.update(p)
    texcoordBuffer.update(tex)
  }
  requestAnimationFrame(update);
}
