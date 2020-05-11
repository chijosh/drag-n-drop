const bookmarkNames = document.querySelectorAll(".item-text");
const dragContainer = document.querySelectorAll(".item");
const draggableItems = document.querySelectorAll(".item-drag");

/*
There are two sections for this task. The first section handles a dummy dropdown list, while the section section handles the drag functionality.
*/

// Handle default states

let bookmarkToggle = "open";
let draggedItem = null;

// This Section handles the dropdown items

// Populate the localstorage for dropdown items
window.onload = () => {
  if (sessionStorage["bookmarkObj"] != null) {
    let data = JSON.parse(sessionStorage["bookmarkObj"]);
    buildBookmarkItems(data);
  } else {
    let dataJSON = [
      { id: 01, name: "BBC News", value: ["latest report", "old news"] },
      { id: 02, name: "Helsingin Sanomat", value: ["reports", "old news"] },
      { id: 03, name: "Vasabladet", value: ["latest report", "old news"] },
      { id: 04, name: "FOX News", value: ["latest report", "breaking news"] },
      { id: 05, name: "The Guardian", value: ["recent report", "old news"] },
    ];
    sessionStorage["bookmarkObj"] = JSON.stringify(dataJSON);
    console.log(sessionStorage["bookmarkObj"]);
    buildBookmarkItems(dataJSON);
  }
};

// Handle Toggle for dropdown item list
bookmarkNames.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(e);
    if (
      !bookmarkToggle == e.target.children[0].classList.value.includes("open")
    ) {
      e.target.children[0].classList.add("open");
    } else {
      e.target.children[0].classList.remove("open");
    }
  });
});

// This function loops through dropdown items
const buildBookmarkItems = (data) => {
  bookmarkNames.forEach((el) => {
    for (let key of data) {
      if (el.innerHTML === key.name) {
        addBookmarkItem(el, key);
      } else {
        null;
      }
    }
  });
};

// This function creates dropdown unordered list
const addBookmarkItem = (el, bookMarkItems) => {
  let ul = document.createElement("ul");

  bookMarkItems.value.forEach((elem) => {
    let li = document.createElement("li");
    let textInside = document.createTextNode(elem);

    ul.setAttribute("class", "item-text__list");
    li.setAttribute("class", "item-text__list__items");
    li.appendChild(textInside);
    ul.append(li);
  });
  el.append(ul);
};

// This Section handles the draggable feature

// This loop handles the items events
draggableItems.forEach((draggable) => {
  // EventListener for Drag Start
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  // EventListener for Drag End
  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
    draggable.style.backgroundColor = "rgba(0,0,0,0)";
  });
});

// This loop handles the container events
dragContainer.forEach((container) => {
  // EventListener for Drag Over
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    draggable.style.backgroundColor = "rgba(0,0,0,0.2)";
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });

  // EventListener for styling purposes
  container.addEventListener("dragleave", (e) => {
    e.preventDefault();
    container.style.backgroundColor = "rgba(0,0,0,0)";
  });
});

// This function calculates the offset between the dragged item and the destined container
const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".item-drag:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closestEl, childEl) => {
      const box = childEl.getBoundingClientRect();
      const offset = y - box.right - box.width / 2;
      // console.log(offset);
      if (offset < 0 && offset > closestEl.offset) {
        return { offset: offset, element: childEl };
      } else {
        return closestEl;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
