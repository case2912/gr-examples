const GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
const Geometry = gr.lib.fundamental.Geometry.Geometry;
GLExtRequestor.request("OES_element_index_uint");
GeometryFactory.addType("index", {
  divide: {
    converter: "Number",
    default: 2
  }
}, (gl, attrs) => {
  const geometry = new Geometry(gl)
  const indices = Array.from({
    length: attrs.divide
  }, (v, k) => k)
  geometry.addAttributes(indices, {
    INDEX: {
      size: 1
    }
  })
  geometry.addIndex("default", indices, WebGLRenderingContext.POINTS)
  return geometry
})
gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function (args) {
    const r = .5+.5*Math.sin(args.timer.time/3000. * 3.14);
    this.phi = r*3.14;
    this.node.setAttribute('rotation',[this.phi,this.phi,this.phi]);
  },
});
