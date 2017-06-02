const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 10

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  const PI_2 = Math.PI * 2
  //top
  let fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = 0.5
      positions[fi + 3 * (n * i + j) + 2] = 0.5 - i / (n - 1)
    }
  }
  //back
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * (n * i + j) + 2] = -0.5
    }
  }
  //front
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * (n * i + j) + 2] = 0.5
    }
  }
  //left
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5
      positions[fi + 3 * (n * i + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * (n * i + j) + 2] = -0.5 + j / (n - 1)
    }
  }
  //right
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = 0.5
      positions[fi + 3 * (n * i + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * (n * i + j) + 2] = -0.5 + j / (n - 1)
    }
  }

  //bottom
  fi = positions.length

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = -0.5
      positions[fi + 3 * (n * i + j) + 2] = 0.5 - i / (n - 1)
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  let indices = []
  geometry.addIndex("default", Array.from({
    length: n * n * 6 - n * 4
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  return geometry
})