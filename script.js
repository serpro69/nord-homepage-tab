let data;

const $ = function $ (selector, context = document) {
  const elements = Array.from(context.querySelectorAll(selector))
  return {
    elements,
    clear() {
      this.elements.forEach(element => {
        element.innerHTML = ""
      })
      return this
    },
    html(newHtml) {
      this.elements.forEach(element => {
        element.innerHTML += newHtml
      })
      return this
    },
    css(newCss) {
      this.elements.forEach(element => {
        Object.assign(element.style, newCss)
      })
      return this
    },
    focus() {
      context.querySelector(selector).focus();
      return this
    },
    val() {
      return context.querySelector(selector).value
    },
    on(event, handler, options) {
      this.elements.forEach(element => {
        element.addEventListener(event, handler, options)
      })
      return this
    }
  }
};

function search() {
  const find = $("#find").val();
  const results = [{
    "id": "filtered",
    "_": []
  }];
  let found = false;
  if(find.length == 0) {
    $("#main").clear();
    build(data);
    return false;
  }
  data.filter((x) => {
    x._.filter((xx) => {
      if(xx.lbl.indexOf(find) !=-1 || xx.url.indexOf(find) !=-1) {
         results[0]._.push({"url": xx.url, "lbl": xx.lbl});
        found = true;
      }
    });
  });
  $("#main").clear();
  build(found ? results : data);
}

function build(j) {
  for(const x of j) {
    let node = `<section><h1>${x.id}</h1><ul>`;
    for(const l of x._) {
      if(!l.hidden) {
        node += `<li><a href="${l.url}">${l.lbl}</a></li>`
      }
    }
    node += `</ul></section>`;
    $("#main").html(node);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
      build(data);
      const findInput = document.getElementById("find");
      findInput.addEventListener("keypress", search);
      findInput.addEventListener("change", search);
      findInput.focus();
    });
});
