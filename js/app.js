// Local Variables
let sections = document.querySelectorAll(`section`);
const navBarList = document.getElementById(`navbar__list`);
const main = document.getElementsByTagName(`main`)[0];
let lastId = 4;
// Create Li for all sections
let fragment = document.createDocumentFragment();
for (const sec of sections) {
  const addLi = document.createElement(`li`);
  const addA = `<a href="#${sec.id}" data-section-id="${sec.id}" class= "menu__link">${sec.dataset.nav}</a>`;
  addLi.innerHTML = addA;
  fragment.appendChild(addLi);
}
navBarList.append(fragment);

// Add EventListener to scroll into sections
navBarList.addEventListener(`click`, function (event) {
  event.preventDefault();
  const secId = event.target.dataset.sectionId;
  document.getElementById(secId).scrollIntoView({ behavior: "smooth" });
  addActiveClass(secId);
  setTimeout(() => {
    window.location.hash = secId;
  }, 500);
});

// Add and Remove Active Class
function addActiveClass(id) {
  let activeClass = document.querySelector(`.your-active-class`);
  let activeId = document.querySelector(`#${id}`);
  activeClass?.classList.remove(`your-active-class`);
  activeId.classList.add(`your-active-class`);
}
// Add Active Class on Scroll and Add button to scroll top
const btnUp = document.getElementById(`btn-up`);
window.onscroll = function () {
  sections.forEach((ele) => {
    if (
      ele.getBoundingClientRect().top >= -400 &&
      ele.getBoundingClientRect().top <= 150
    ) {
      ele.classList.add(`your-active-class`);
    } else {
      ele.classList.remove(`your-active-class`);
    }
  });
  // Add button to scroll top
  if (window.scrollY >= 600) {
    btnUp.style.display = `block`;
  } else {
    btnUp.style.display = `none`;
  }
};
// Add event click
btnUp.onclick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: `smooth`,
  });
};

// Add New Sections
function sectionContent() {
  lastId += 1;
  return `
  <section id="section${lastId}" data-nav="Section ${lastId}">
        <div class="landing__container">
          <h2>Section ${lastId}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            fermentum metus faucibus lectus pharetra dapibus. Suspendisse
            potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
            lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
            convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
            eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
            nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
            lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
            tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
            vitae elit. Integer nec libero venenatis libero ultricies molestie
            semper in tellus. Sed congue et odio sed euismod.
          </p>
          <p>
            Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
            gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
            Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
            consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
            elementum tortor mollis non.
          </p>
        </div>
      </section>`;
}

// function to add new section
function addNewSection() {
  main.insertAdjacentHTML(`beforeend`, sectionContent());
}
// function to add new navBarLi
function navBarLists() {
  navBarList.insertAdjacentHTML(
    `beforeend`,
    `<li><a href="#section${lastId}" data-section-id="section${lastId}" class= "menu__link">Section ${lastId}</a></li>`
  );
}

// Button to add a new Section
const btnAddNewSection = document.getElementById(`addNewSection`);
btnAddNewSection.addEventListener(`click`, function () {
  addNewSection();
  navBarLists();
  sections = document.querySelectorAll(`section`);
});

// Add Button to delete section and li
function deleteSectionAndLi() {
  if (Array.from(navBarList.children).length > 4) {
    lastId -= 1;
    navBarList.lastElementChild.remove();
    main.lastElementChild.remove();
  }
}
// Button to delete li
const btnDeleteSection = document.getElementById(`deleteNewSection`);
btnDeleteSection.addEventListener(`click`, () => {
  deleteSectionAndLi();
  sections = document.querySelectorAll(`section`);
});
