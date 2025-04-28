export function renderPage(container, currentData) {
    let htmlContent = '';
    currentData.forEach(item => {
        htmlContent += item;
    });
    container.innerHTML = htmlContent;
}
