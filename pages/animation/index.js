gr(() => {
  var ratio = 0;

  function rotate() {
    gr("#main")("mesh").setAttribute('rotation', '0,' + ratio + ',0');
    ratio += 0.5;
    requestAnimationFrame(rotate);
  }
  rotate();
  $("#input").change(function() {
    gr("#main")("mesh").setAttribute("albedo", [0, 0, $("#input").val(), $("#input").val()]);
  });
});