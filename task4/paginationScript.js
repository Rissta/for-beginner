function renderPage(page, count, paginationArea) {
    const start = (page - 1) * count;
    const end = page * count;
    const currentData = data.slice(start, end);

    let htmlContent = '';
    currentData.forEach(item => {
        htmlContent += `<div class="element-pagination"><p>${item}</p></div>`;
    });
    paginationArea.innerHTML = htmlContent;
}

function updateButtons(currentPage, totalPages, buttonArea, visibleButtons = 0) {
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

function setupPagination(data, count, paginationAreaName, buttonAreaName, visibleButtons = 0) {
    const buttonArea = document.querySelector(buttonAreaName);
    const paginationArea = document.querySelector(paginationAreaName);
    if(!buttonArea || !paginationArea){
        console.log("Не существует элементов пагинации")
        return;
    }
    const totalPages = Math.ceil(data.length / count);
    let currentPage = 1;
    function updateInterface() {
        updateButtons(currentPage, totalPages, buttonArea, visibleButtons);
        renderPage(currentPage, count, paginationArea);
    }
    buttonArea.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('prev-button')) {
            if (currentPage > 1) {
                currentPage--;
            }
        } else if (target.classList.contains('next-button')) {
            if (currentPage < totalPages) {
                currentPage++;
            }
        } else if (target.classList.contains('number-button')) {
            currentPage = parseInt(target.textContent);
        }

        updateInterface();
    });
    updateInterface();
}
const width = window.innerWidth;
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
function updatePaginationOnResize() {
    const width = window.innerWidth;
    let count = 30;

    if (width > 1600) {
        count = 30;
    } else if (width > 1440) {
        count = 27;
    } else if (width > 1200) {
        count = 24;
    } else if (width > 992) {
        count = 14;
    } else if (width > 786) {
        count = 12;
    } else if (width > 576 ) {
        count = 8;
    } else if (width > 393 ) {
        count = 6;
    } else if (width > 1 ) {
        count = 4;
    } 
    setupPagination(data, count, '.pagination-container', '.pagination-button', 3);
}
updatePaginationOnResize()
window.addEventListener('resize', updatePaginationOnResize);