gr(() => {
  var ratio = 0;

  function rotate() {
    gr("#sample3")("mesh").setAttribute('rotation', '0,' + ratio + ',0');
    ratio += 0.5;
    requestAnimationFrame(rotate);
  }
  rotate();
  $("#input").change(function() {
    gr("#sample3")("mesh").setAttribute("albedo", [0, 0, $("#input").val(), 1]);
  });
});