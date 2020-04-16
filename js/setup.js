const pages = document.querySelectorAll(".page");
const contents = document.querySelectorAll(".page-content");

const addProperty = (element, key, value) =>
  element.style.setProperty(key, value);

const transitionedCallBack = (page, zindex) => {
  addProperty(page, "z-index", zindex);
};
const nextPage = (page, index) => {
  let z_index = (index + 1) * 5;
  page.addEventListener(
    "transitionend",
    () => transitionedCallBack(page, z_index),
    { once: true }
  );
  const routateY = 105 - (index + 2);
  addProperty(
    page,
    "transform",
    `perspective(25cm) rotateX(15deg) rotateY(-${routateY}deg)`
  );
  addProperty(
    page,
    "background",
    "linear-gradient(90deg, rgba(208,208,208,1) 0%, rgba(243,243,243,1) 22%, rgba(255,255,255,1) 50%, rgba(243,243,243,1) 79%, rgba(208,208,208,1) 100%)"
  );
  addProperty(contents[index], "opacity", 0);
};

const previousPages = () => {
  const reverseBack = [];
  pages.forEach((page) => reverseBack.unshift(page));
  reverseBack.forEach((page, index) => {
    const content = page.querySelector(".page-content");
    let z_index = (index + 1) * 5;

    addProperty(page, "z-index", z_index);
    addProperty(
      page,
      "transform",
      "perspective(25cm) rotateX(15deg) rotateY(5deg)"
    );
    addProperty(page, "background", "#fff");
    addProperty(content, "opacity", 1);
  });
};

pages.forEach((page, index) => {
  if (index < pages.length - 1) {
    let z_index = 100 - index * 5;
    addProperty(page, "z-index", z_index);
    page.addEventListener("click", () => nextPage(page, index));
  } else {
    page.addEventListener("click", () => previousPages());
  }
});
