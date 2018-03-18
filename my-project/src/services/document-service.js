class DocumentService {
  constructor() {}
  setTitle(title) {
    document.title = title;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      try {
        var i = document.createElement("iframe");
        i.src = "/favicon.ico";
        i.style.display = "none";
        i.onload = function() {
          setTimeout(function() {
            i.remove();
          }, 9);
        };
        document.body.appendChild(i);
      } catch (e) {}
    }
  }
  getTitle() {
    return document.title;
  }
}
module.exports =  new DocumentService();
