const GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
const Geometry = gr.lib.fundamental.Geometry.Geometry;
GLExtRequestor.request("OES_element_index_uint");
GeometryFactory.addType("index", {
  number: {
    converter: "Number",
    default: 2
  }
}, (gl, attrs) => {
  const geometry = new Geometry(gl)
  const positions = Array.from({
    length: attrs.number * 2
  }, () => Math.random())
  positions[0] = 0;
  positions[1] = 0;
  positions[2] = 2;
  positions[3] = 0;
  positions[4] = 0;
  positions[5] = 2;
  geometry.addAttributes(positions, {
    POSITIONXY: {
      size: 2
    }
  })

  function circle(a, b, c, v) { //setIndex縁の内部ならtrue
    const x1 = positions[2 * a + 0]
    const y1 = positions[2 * a + 1]
    const x2 = positions[2 * b + 0]
    const y2 = positions[2 * b + 1]
    const x3 = positions[2 * c + 0]
    const y3 = positions[2 * c + 1]
    const vx = positions[2 * v + 0]
    const vy = positions[2 * v + 1]
    const p = 2 * ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1))
    const x = ((y3 - y1) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1) + (y1 - y2) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) / p;
    const y = ((x1 - x3) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1) + (x2 - x1) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) / p;
    const r = (x - x1) * (x - x1) + (y - y1) * (y - y1)
    const vr = (x - vx) * (x - vx) + (y - vy) * (y - vy)
    return r - vr > 0
  }
  const indices = Array.from({
    length: attrs.number
  }, (v, k) => k)
  const lines = [];
  const triangles = [
    [0, 1, 2]
  ];
  let stack = [];
  for (var i = 3; i < indices.length; i++) { //点を加える
    for (var j = triangles.length - 1; j >= 0; j--) {
      if (circle(triangles[j][0], triangles[j][1], triangles[j][2], i)) { //点が外接円の内部にあるかどうか
        const s = stack.map(v => v.toString())
        if (s.indexOf([triangles[j][0], triangles[j][1]].toString()) < 0) {
          stack.push([triangles[j][0], triangles[j][1]])
        } else {
          stack.splice(s.indexOf([triangles[j][0], triangles[j][1]].toString()),1)
        }
        if (s.indexOf([triangles[j][1], triangles[j][2]].toString()) < 0) { stack.push([triangles[j][1], triangles[j][2]]) } else {
          stack.splice(s.indexOf([triangles[j][1], triangles[j][2]].toString()),1)
        }
        if (s.indexOf([triangles[j][0], triangles[j][2]].toString()) < 0) { stack.push([triangles[j][0], triangles[j][2]]) } else {
          stack.splice(s.indexOf([triangles[j][0], triangles[j][2]].toString()),1)          
        }
        triangles.splice(j, 1)
      }
    }
    stack.forEach(function (element) {
      triangles.push([element[0], element[1], i].sort());
    }, this);
    stack = []
  }
  triangles.forEach(function (element) {
    lines.push(element[0])
    lines.push(element[1])
    lines.push(element[0])
    lines.push(element[2])
    lines.push(element[1])
    lines.push(element[2])
  }, this);

  geometry.addIndex("default", indices, WebGLRenderingContext.POINTS)
  geometry.addIndex("lines", lines, WebGLRenderingContext.LINES)
  return geometry
});