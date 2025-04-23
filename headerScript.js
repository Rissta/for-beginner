const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if(window.scrollY > 40){
        header.style.backgroundColor = 'rgba(128, 128, 128, 0.45)';
    } else{
        header.style.backgroundColor = 'rgba(128, 128, 128, 0)';
    }
})