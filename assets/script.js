let data;

const $ = function $(selector, context = document) {
  const elements = Array.from(context.querySelectorAll(selector));
  return {
    elements,
    clear() {
      this.elements.forEach((element) => {
        element.innerHTML = "";
      });
      return this;
    },
    html(newHtml) {
      this.elements.forEach((element) => {
        element.innerHTML += newHtml;
      });
      return this;
    },
    css(newCss) {
      this.elements.forEach((element) => {
        Object.assign(element.style, newCss);
      });
      return this;
    },
    focus() {
      context.querySelector(selector).focus();
      return this;
    },
    val() {
      return context.querySelector(selector).value;
    },
    on(event, handler, options) {
      this.elements.forEach((element) => {
        element.addEventListener(event, handler, options);
      });
      return this;
    },
  };
};

function search() {
  const find = $("#find").val();
  const results = [
    {
      id: "filtered",
      _: [],
    },
  ];
  let found = false;
  if (find.length == 0) {
    $("#main").clear();
    build(data);
    return false;
  }
  data.filter((x) => {
    x._.filter((xx) => {
      if (xx.lbl.indexOf(find) != -1 || xx.url.indexOf(find) != -1) {
        results[0]._.push({ url: xx.url, lbl: xx.lbl });
        found = true;
      }
    });
  });
  $("#main").clear();
  build(found ? results : data);
}

function build(j) {
  for (const x of j) {
    let node = `<section>
      <h1><i class="fa-solid ${x.icon}"></i> ${x.id}</h1>
      <ul class="fa-ul">`;
    for (const l of x._) {
      if (!l.hidden) {
        let icon = "";
        if (l.icon) {
          icon = `<i class="fas ${l.icon}"></i>`;
          if (l.icon.startsWith("devicon")) {
            icon = `<i class="${l.icon}"></i>`
          }
        }
        node += `<li>
          <span class="fa-li">${icon}</span>
          <a id="url" href="${l.url}">${l.lbl}</a>
        </li>`;
      }
    }
    node += `</ul></section>`;
    $("#main").html(node);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      build(data);
      const findInput = document.getElementById("find");
      findInput.addEventListener("keypress", search);
      findInput.addEventListener("change", search);
      findInput.focus();
    });

  // add icon on hovering over urls
  /*
  document.getElementById("main").addEventListener("mouseover", function(event) {
    if (event.target.matches("a#url")) {
      const iconSpan = event.target.previousElementSibling;
      if (!iconSpan.querySelector("svg")) {
        const iconElement = document.createElement("i");
        iconElement.classList.add("on-hover")
        iconElement.classList.add("fas");
        iconElement.classList.add("fa-xl");
        iconElement.classList.add("fa-spinner");
        iconElement.classList.add("fa-pulse");
        iconSpan.appendChild(iconElement);
      }
    }
  });

  document.getElementById("main").addEventListener("mouseout", function(event) {
    if (event.target.matches("a#url")) {
      const iconSpan = event.target.previousElementSibling;
      const iconElement = iconSpan.querySelector("svg.on-hover");
      if (iconElement) {
        iconSpan.removeChild(iconElement);
      }
    }
  });
*/
});
