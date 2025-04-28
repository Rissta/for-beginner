import { renderPage } from "./fillContainer.js"; 

export function updateButtons(currentPage, totalPages, buttonArea, visibleButtons = 0) {
    buttonArea.innerHTML = '';
    buttonArea.innerHTML += '<button class="prev-button"> < </button>';
    let startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + visibleButtons - 1);
    if (endPage - startPage + 1 < visibleButtons) {
        startPage = Math.max(1, endPage - visibleButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        buttonArea.innerHTML += `<button class="number-button ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    buttonArea.innerHTML += '<button class="next-button"> > </button>';
}

export function setupPagination(data, count, paginationAreaName, buttonAreaName, visibleButtons = 0) {
    const buttonArea = document.querySelector(buttonAreaName);
    const paginationArea = document.querySelector(paginationAreaName);
    if (!buttonArea || !paginationArea) {
        console.log("Не существует элементов пагинации");
        return;
    }
    const totalPages = Math.ceil(data.length / count);
    let currentPage = 1;
    function updateInterface() {
        updateButtons(currentPage, totalPages, buttonArea, visibleButtons);
        const start = (currentPage - 1) * count;
        const end = currentPage * count;
        const currentData = data.slice(start, end);
        renderPage(paginationArea, currentData);
    }
    buttonArea.onclick = (event) => {
        const target = event.target;
        if (target.classList.contains('prev-button') && currentPage > 1) {
            currentPage--;
        } else if (target.classList.contains('next-button') && currentPage < totalPages) {
            currentPage++;
        } else if (target.classList.contains('number-button')) {
            currentPage = parseInt(target.textContent);
        }
        updateInterface();
    };
    updateInterface();
}
