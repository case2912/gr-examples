document.addEventListener("DOMContentLoaded", () => {
  const req = new XMLHttpRequest();
  req.open("get", "config.json", true);
  req.send(null);
  req.onload = function() {
    const images = JSON.parse(req.responseText).pages.map(v => 'image/' + v + '.png');
    const movies = [];//JSON.parse(req.responseText).movies.map(v => 'movies/' + v);
    const pages = images.concat(movies);
    // for (var i = pages.length - 1; i > 0; i--) {
    //   var r = Math.floor(Math.random() * (i + 1));
    //   var tmp = pages[i];
    //   pages[i] = pages[r];
    //   pages[r] = tmp;
    // }
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
      item.firstElementChild.innerHTML = '';
      item.lastElementChild.href = '';
      item.lastElementChild.firstElementChild.src = pages[i];
      parent.appendChild(item);
    }
  }
});