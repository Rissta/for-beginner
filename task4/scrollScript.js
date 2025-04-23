
function Scroll(scrollArea) {
    let isFocus = false;
    let startX = null;
    let scrollLeft = null;
    container = document.querySelector(scrollArea);
    if(!container){
        console.log("Нету элемента свайпа");
        return;
    }
    container.addEventListener('mousedown',(e) => {
        isFocus = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    })
    container.addEventListener('mouseup',(e) => {
        isFocus = false;
    })
    container.addEventListener('mousemove',(e) => {
        if(isFocus == false) return;
        let x = e.pageX - container.offsetLeft; 
        let moveX = x-startX
        container.scrollLeft = scrollLeft - moveX;
    })
    container.addEventListener('mouseleave',(e) => {
        isFocus = false;
    })
    // container.addEventListener('wheel', (e) =>{
    //     container.scrollLeft +=e.deltaY;
    // })
}

Scroll('.scroll-container')