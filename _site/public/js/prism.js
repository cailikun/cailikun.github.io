  
function loadStyle(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}
(function () {
  var loadJs = (function () {
    var script = document.createElement('script');
    if (script.readyState) {
      return function (url) {
        return new Promise(function (res, rej) {
          script = document.createElement('script');
          script.src = url;
          document.body.appendChild(script);
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
              script.readyState == "complete") {
              script.onreadystatechange = null; //解除引用
              res();
            }
          };
        })
      }
    } else {
      return function (url) {
        return new Promise(function (res, rej) {
          script = document.createElement('script');
          script.src = url;
          document.body.appendChild(script);
          script.onload = function () {
            res();
          };
        })
      }
    }
  })();
  loadJs('//cdn.jsdelivr.net/npm/prismjs/components/prism-core.min.js')
    .then(function () {
      loadStyle('//cdn.jsdelivr.net/npm/prismjs/themes/prism-coy.css');
      
      loadStyle('//cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.css');
      for (var i = 0, x = document.getElementsByTagName("pre"); i < x.length; i++)
        x[i].classList.add('line-numbers');

      loadJs('//cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js');
      

      
      loadJs('//cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js').then(function () {
        Prism.plugins.autoloader.languages_path = '//cdn.jsdelivr.net/npm/prismjs/components/';
      })
      

      
      loadJs('//cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.min.js')
        .then(function () {
          loadStyle('//cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.css');
          
          Prism.plugins.toolbar.registerButton('select-code', function (env) {
            var button = document.createElement('button');
            button.innerHTML = '选中这段' + env.language;
            button.addEventListener('click', function () {
              // Source: http://stackoverflow.com/a/11128179/2757940
              if (document.body.createTextRange) { // ms
                var range = document.body.createTextRange();
                range.moveToElementText(env.element);
                range.select();
              } else if (window.getSelection) { // moz, opera, webkit
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(env.element);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            });
            return button;
          });
          
        })
      
    })
})();

