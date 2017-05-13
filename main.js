$(() => {
  $.getJSON("./pagelist.json", (data) => {
    for (var i = 0; i < data.pages.length; i++) {
      $(".pagelist").append(
        '<li><a href=' +
        location.href +
        'pages/' +
        data.pages[i] +
        '>' +
        data.pages[i] +
        '</a><img src=resource/' +
        data.pages[i] +
        '.png></img></li>'
      );
    }
  });
});