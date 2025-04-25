function renderPage(paginationArea, currentData) {
    let htmlContent = '';
    currentData.forEach(item => {
        htmlContent += item;
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

//Полчение данных
let data = [];
requestMoviesByName(['Matrix', 'Spider-man', 'iron-man', 'sherlock holmes']).then(movies => {
    movies.forEach(movie => {
        const elementHTML = ` 
            <div>
                <div class="element-pagination" style="background-image: url(${movie.poster});">

                </div>
                <p>${movie.title}</p>
            </div>`;
            
        data.push(elementHTML);
    });
    updatePaginationOnResize();
});

//Изменение количества элементов от ширины
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
window.addEventListener('resize', updatePaginationOnResize);