!(() => {
  const n = 2;
  const positions = [];
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var i = 0; i < n; i++) {
      positions[3 * i + 0] = i
      positions[3 * i + 1] = 0
      positions[3 * i + 2] = 0
    }

    const indices = [];
    for (var i = 0; i < indices.length; i++) {
      indices[i] = i
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    console.log(positions, indices)
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
    return geometry
  });
})()