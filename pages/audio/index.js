var ctx, analyser, frequencies, getByteFrequencyDataAverage, elVolume, draw;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();
analyser = ctx.createAnalyser();
frequencies = new Float32Array(analyser.frequencyBinCount);
navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(function(stream) {
    window.hackForMozzila = stream;
    ctx.createMediaStreamSource(stream)
      .connect(analyser);
  })
  .catch(function(err) {
    console.log(err.message);
  });
(draw = function() {
  analyser.getFloatFrequencyData(frequencies);
  requestAnimationFrame(draw);
})();

const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 1024
let buffer;
GeometryFactory.addType("frame", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  for (var i = 0; i < n; i++) {
    positions[3 * i + 0] = i / (n - 1) - 0.5
    positions[3 * i + 1] = 0
    positions[3 * i + 2] = 0
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addIndex("default", Array.from({
    length: positions.length / 3
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
  return geometry
})
gr(() => {
  update()
})
const update = () => {
  const b = new Float32Array(n * 3)
  for (var i = 0; i < b.length; i++) {
    b[3 * i + 0] = i / (n - 1) - 0.5
    b[3 * i + 1] = (frequencies[i] + 100)/70
  }
  buffer.update(b)
  requestAnimationFrame(update)
}
