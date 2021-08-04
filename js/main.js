let textControlEl = null;
let overlayEl = null;
let urlBtnEl = null;
let urlInputEl = null;
let iframeDoc = null;

let selectedEl = null;
let selectedClassEl = null;

const init = () => {
  iframeDoc = document.querySelector("iframe").contentWindow;
  textControlEl = document.querySelector(".te-controls");
  overlayEl = document.querySelector(".overlay");
  urlBtnEl = document.querySelector(".overlay button");
  urlInputEl = document.querySelector(".overlay input");

  textControlEl.addEventListener("click", ({ target }) => {
    const mainTarget = target.closest(".te-btn");
    if (!mainTarget.matches(".te-btn")) {
      return;
    }

    const tagName = mainTarget.dataset.element;
    const classElement = mainTarget.dataset.classElement;

    if (tagName === "img" || tagName === "a") {
      selectedEl = tagName;
      selectedClassEl = classElement;
      openOverlay();
      return;
    }

    insertElement({
      tagName,
      classElement,
    });
  });

  urlBtnEl.addEventListener("click", () => {
    closeOverlay();
    const opts = {
      tagName: selectedEl,
      classElement: selectedClassEl,
    };

    if (selectedEl === "img") {
      opts.src = urlInputEl.value;
    }
    if (selectedEl === "a") {
      opts.href = urlInputEl.value;
    }

    insertElement(opts);
    urlInputEl.value = "";
  });
};

const insertElement = ({ tagName, classElement, src, href } = {}) => {
  const selection = iframeDoc.getSelection();

  const range = new Range();
  range.setStart(selection.baseNode, selection.baseOffset);
  range.setEnd(selection.extentNode, selection.extentOffset);

  const el = document.createElement(tagName);
  el.classList.add(classElement);

  if (src) {
    el.src = src;
    // el.setAttribute('src', src);
  }
  if (href) {
    el.href = href;
    // el.setAttribute('href', href);
  }

  range.surroundContents(el);
};

const openOverlay = () => {
  overlayEl.style.display = "flex";
};
const closeOverlay = () => {
  overlayEl.style.display = "none";
};

window.addEventListener("load", init);
