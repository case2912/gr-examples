document.addEventListener("DOMContentLoaded", () => {
  const req = new XMLHttpRequest();
  req.open("get", "config.json", true);
  req.send(null);
  req.onload = function() {
    const images = JSON.parse(req.responseText).pages.map(v => 'images/' + v + '.png');
    const movies = [];
    const pages = images.concat(movies);
    const div = document.createElement('div');
    const h5 = document.createElement('h5');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const parent = document.getElementsByClassName('pagelist')[0];
    div.appendChild(h5);
    div.classList.add('item');
    a.appendChild(img);
    div.appendChild(a);
    for (var i = 0; i < pages.length; i++) {
      const item = div.cloneNode(true);
      item.firstElementChild.innerHTML = JSON.parse(req.responseText).pages[i];
      item.lastElementChild.href = 'pages/' + JSON.parse(req.responseText).pages[i];
      item.lastElementChild.firstElementChild.src = pages[i];
      parent.appendChild(item);
    }
  }
});