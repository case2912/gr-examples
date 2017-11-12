const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 10
const positions = []
let buffer;
GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  //top
  let fi = positions.length
  const distance = (i, j) => 5 * Math.sqrt(0.75 + -(i + j) / (n - 1) + (j * j + i * i) / ((n - 1) * (n - 1)))
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (-0.5 + j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = 0.5 / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - i / (n - 1)) / d
    }
  }
  //back
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (-0.5 + j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = -0.5 / d
    }
  }
  //front
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (0.5 - j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = 0.5 / d
    }
  }
  //left
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = -0.5 / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - j / (n - 1)) / d
    }
  }
  //right
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = 0.5 / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = (-0.5 + j / (n - 1)) / d
    }
  }

  //bottom
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (0.5 - j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = -0.5 / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - i / (n - 1)) / d
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
  geometry.addIndex("default", Array.from({
    length: n * n * 6
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  return geometry
})