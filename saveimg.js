gr(function() {
  if (gr.debug) {
    var goml = gr("#main")("goml");
    goml.setAttribute("width", 400);
    goml.setAttribute("height", 300);
    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 65) saveImg(document.title + ".png")
    });
  }

})

function saveImg(fileName) {
  const canvas = document.getElementsByClassName("gr-container")[0].children[0];
  var a = document.createElement('a');
  var e = document.createEvent('MouseEvent');
  a.href = canvas.toDataURL();
  a.download = fileName;
  e.initEvent("click");
  a.dispatchEvent(e);
}