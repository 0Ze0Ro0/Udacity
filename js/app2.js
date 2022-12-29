// Global Variables
let sections = document.querySelectorAll(`section`);
let navigation = document.getElementById(`navbar__list`);

// Build menu
function listItem() {
  // Create createDocumentFragment
  const fragment = document.createDocumentFragment();
  // Create Li for all sections
  for (const sec of sections) {
    const sectionName = sec.getAttribute(`data-nav`);
    const sectionLink = sec.getAttribute("id");
    const listItem = document.createElement(`li`);
    listItem.innerHTML = `<a class="menu__link" data-section-id="${sec.id}" href="#${sectionLink}">${sectionName}</a>`;
    // Add listItem to fragment
    fragment.appendChild(listItem);
  }
  // Add fragment to navigation
  navigation.append(fragment);
}

// build the nav
listItem();

// Scroll to section on link click
navigation.addEventListener(`click`, function (event) {
  event.preventDefault();
  // Add smooth scroll
  document
    .getElementById(event.target.dataset.sectionId)
    .scrollIntoView({ behavior: "smooth" });
  // Add section id to url
  setTimeout(() => {
    window.location.hash = event.target.getAttribute(`data-section-id`);
  }, 400);
});

// Add class 'active' to section when near top of viewport
onscroll = function () {
  // Add and remove class active to link
  activeLink();
  // Add and remove class active to section
  activeClass();
};

// function to add and remove class active to section
function activeClass() {
  sections.forEach((elem) => {
    if (
      elem.getBoundingClientRect().top >= -400 &&
      elem.getBoundingClientRect().top <= 150
    ) {
      elem.classList.add(`your-active-class`);
    } else {
      elem.classList.remove(`your-active-class`);
    }
  });
}

// function to add and remove class active to link
function activeLink() {
  for (let section of sections) {
    const sectionDim = section.getBoundingClientRect();
    let sectionTitle = section.getAttribute("data-nav");
    const links = document.querySelectorAll("li");
    if (sectionDim.top >= 0 && sectionDim.top < 300) {
      for (let link of links) {
        link.classList.remove("active-link");
        if (link.textContent === sectionTitle) {
          link.classList.add("active-link");
        }
      }
    }
  }
}
