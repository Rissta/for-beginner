import { createCard } from './createCards.js';
import { setupPagination } from './paginationScript.js';

async function fillPagination() {
    const data = await createCard('element-pagination', ['Spider-Man', 'Iron Man', 'Thor', 'Avengers', 'Guardians of the Galaxy']);
    // ['Spider-Man', 'Iron Man', 'Thor', 'Captain America', 'Avengers', 'Guardians of the Galaxy', 'X-Men', 'Fantastic Four', 'Marvel', 'Black Panther', 'Doctor Strange', 'Ant-Man']
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
        } else if (width > 576) {
            count = 8;
        } else if (width > 393) {
            count = 6;
        } else {
            count = 4;
        }

        setupPagination(data, count, '.pagination-container', '.pagination-button', 3);
    }

    window.addEventListener('resize', updatePaginationOnResize);
    updatePaginationOnResize(); // запуск при старте
}

fillPagination();
