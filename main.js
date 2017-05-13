$(() => {
  $.getJSON("./pagelist.json", (data) => {
    for (var i = 0; i < data.pages.length; i++) {
      $(".pagelist").append(
        '<div class=item><a href=pages/' + data.pages[i] + '><img src=resource/' + data.pages[i] + '.png width=200 height=150/></a><p><b>' + data.pages[i] + '</b></p><p>' + data[data.pages[i]] + '</p></div>'
      );
    }
  });
});