const bookmarkNames = document.querySelectorAll('.item-text');
const dragContainer = document.querySelectorAll('.item');
const draggableItems = document.querySelectorAll('.item-drag');

/*
There are two sections for this task. The first section handles a dummy dropdown list, while the section section handles the drag functionality.
*/

// Handle default states

let draggedItem = null;

// This Section handles the dropdown items

// Populate the localstorage for dropdown items
window.onload = () => {
  // This Section handles the draggable feature

  // This loop handles the items events
  draggableItems.forEach((draggable) => {
    // EventListener for Drag Start
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    // EventListener for Drag End
    draggable.addEventListener('dragend', (e) => {
      draggable.classList.remove('dragging');
      // draggable.style.backgroundColor = 'rgba(0,0,0,0)';
    });
  });

  // This loop handles the container events
  dragContainer.forEach((container) => {
    // EventListener for Drag Over
    container.addEventListener('dragover', (e) => {
      e.preventDefault();

      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      // draggable.style.backgroundColor = 'rgba(0,0,0,0.2)';
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });

    // EventListener for styling purposes
    container.addEventListener('dragleave', (e) => {
      e.preventDefault();
      container.style.backgroundColor = '#e9c46a';
    });
  });

  // This function calculates the offset between the dragged item and the destined container
  const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll('.item-drag:not(.dragging)'),
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
};
