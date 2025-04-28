import { createCard } from './createCards.js';
import { renderPage } from './fillContainer.js';

async function fillScroll() {
    const data = await createCard('element-scroll', ['Batman', 'Superman', 'Justice League', 'The Flash', 'Shazam']);
    renderPage(document.querySelector('.scroll-container'), data)
}
fillScroll();
