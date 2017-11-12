document.addEventListener("DOMContentLoaded", () => {
  const aTag = document.createElement('a');
  aTag.innerHTML = 'View source';
  aTag.id = 'github-link';
  document.body.appendChild(aTag);
  const titleAry = location.href.split("/");
  document.title = titleAry[titleAry.length - 2];
  document.getElementById("github-link").href = 'https://github.com/case2912/gr-examples/tree/master/pages/' + document.title;
  var stats = new Stats();
  stats.domElement.style.position = "fixed";
  stats.domElement.style.left = "5px";
  stats.domElement.style.top = "5px";
  stats.showPanel(0);
  document.body.appendChild(stats.domElement);
  gr.registerComponent("FPSManager", {
    attributes: {},
    $render: function () {
      stats.update();
    }
  });
  gr(() => {
    gr("#main")("renderer").first().addComponent("FPSManager");
  });
});